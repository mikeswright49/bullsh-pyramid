import * as firebase from 'firebase';
import { shortId } from '../utilities/shortid';
import { GameStage } from '../enums/game-stage';
import { GameState } from 'types/game-state';
import { getFirebaseConfig } from '../../config/firebase-config';
import { Player } from 'types/player';
import { Card } from 'types/card';

export class GameStore {
    private static database: firebase.database.Database;
    private static subscribers = [];

    public static async createGame(playerCount: number, tierCount: number): Promise<string> {
        GameStore.init();
        const ID_LENGTH = 4;
        const gameId = shortId(ID_LENGTH);

        const gameState = {
            id: gameId,
            gameStage: GameStage.Initiation,
            activeIndex: 0,
            activeRow: 0,
            playerCount,
            tierCount,
        } as GameState;

        try {
            await GameStore.database.ref(`games/${gameId}`).set(gameState);
            return gameId;
        } catch (error) {
            console.error(error);
        }
    }

    public static subscribeToGame(gameId: string, updateCallback: (snapshot: GameState) => void) {
        GameStore.init();
        const game = GameStore.database.ref(`games/${gameId}`);
        GameStore.subscribers.push(
            game.on('value', (val) => {
                const value = val.val();
                updateCallback(value as GameState);
            })
        );
    }

    public static subscribeToPlayers(gameId: string, updateCallback: (snapshot: Player) => void) {
        GameStore.init();
        const game = GameStore.database.ref(`games/${gameId}/players`);
        const players = GameStore.database.ref(`players`);
        game.on('child_added', (child) => {
            const playerId = child.val();
            players.child(playerId).on('value', (val) => {
                const value = val.val();
                updateCallback(value as Player);
            });
        });
    }

    public static unsubscribeToGame() {
        GameStore.subscribers.forEach((sub) => sub.off('value'));
    }

    public static async updateGameStage(gameId: string, gameStage: GameStage) {
        await GameStore.database.ref(`games/${gameId}`).update({
            gameStage,
        });
    }

    public static async updateTiers(gameId: string, tiers: Card[][]) {
        await GameStore.database.ref(`games/${gameId}`).update({
            tiers,
        });
    }

    public static async setActiveCard(
        gameId: string,
        index: { activeRow: number; activeIndex: number }
    ) {
        await GameStore.database.ref(`games/${gameId}`).update(index);
    }

    public static async joinGame(gameId: string, playerId: string) {
        await GameStore.database.ref(`games/${gameId}/players`).push(playerId);
    }

    private static init() {
        if (!firebase.apps.length) {
            firebase.initializeApp(getFirebaseConfig());
        }
        if (!GameStore.database) {
            GameStore.database = firebase.database();
        }
    }
}

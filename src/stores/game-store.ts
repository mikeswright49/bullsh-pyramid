import * as firebase from 'firebase';
import { shortId } from '../utilities/shortid';
import { GameStage } from '../enums/game-stage';
import { GameState } from 'types/game-state';
import { Hand } from 'types/hand';
import { getFirebaseConfig } from '../../config/firebase-config';

export class GameStore {
    private static database: firebase.database.Database;
    private static subscribers = [];

    public static init() {
        if (!firebase.apps.length) {
            firebase.initializeApp(getFirebaseConfig());
        }

        GameStore.database = firebase.database();
    }

    public static async createGame(playerCount: number, tierCount: number): Promise<string> {
        const ID_LENGTH = 4;
        const gameId = shortId(ID_LENGTH);

        const gameState = {
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

    public static subscribeToPlayer(gameId: string, updateCallback: (snapshot: GameState) => void) {
        const game = GameStore.database.ref(`games/${gameId}`);
        GameStore.subscribers.push(
            game.on('value', (val) => {
                const value = val.val();
                updateCallback(value as GameState);
            }),
            game.child('/players').on('child_added', (child) => {
                const player = child.val();
                console.log(player);
            })
        );
    }

    public static unsubscribeToGame() {
        GameStore.subscribers.forEach((sub) => sub.off('value'));
    }

    public static async updateGameStage(gameId: string, gameStage: GameStage) {
        await GameStore.database.ref(`games/${gameId}`).update({
            gameStage,
        });
    }

    public static async setHand(gameId: string, hand: Hand) {
        await GameStore.database.ref(`games/${gameId}`).update(hand);
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
}

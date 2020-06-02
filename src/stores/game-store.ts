import * as firebase from 'firebase';
import { shortId } from '../utilities/shortid';
import { GameStage } from '../enums/game-stage';
import { GameState } from 'types/game-state';
import { Hand } from 'types/hand';
import { getFirebaseConfig } from '../../config/firebase-config';

export class GameStore {
    private static database;
    private static subscribers = [];
    private static initialized = false;

    public static async createGame(playerCount: number, tierCount: number): Promise<string> {
        if (!GameStore.initialized) {
            GameStore.init();
        }

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
        if (!GameStore.initialized) {
            GameStore.init();
        }

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
        if (!GameStore.initialized) {
            GameStore.init();
        }

        await GameStore.database.ref(`games/${gameId}`).update({
            gameStage,
        });
    }

    public static async setHand(gameId: string, hand: Hand) {
        if (!GameStore.initialized) {
            GameStore.init();
        }

        await GameStore.database.ref(`games/${gameId}`).update(hand);
    }

    public static async setActiveCard(
        gameId: string,
        index: { activeRow: number; activeIndex: number }
    ) {
        if (!GameStore.initialized) {
            GameStore.init();
        }

        await GameStore.database.ref(`games/${gameId}`).update(index);
    }

    public static async joinGame(gameId: string, playerId: string) {
        if (!GameStore.initialized) {
            GameStore.init();
        }

        await GameStore.database.ref(`games/${gameId}/players`).push(playerId);
    }

    private static init() {
        if (!firebase.apps.length) {
            firebase.initializeApp(getFirebaseConfig());
        }

        GameStore.database = firebase.database();
        GameStore.subscribers = [];
        GameStore.initialized = true;
    }
}

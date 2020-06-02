import * as firebase from 'firebase';
import { getFirebaseConfig } from '../../config/firebase-config';
import { shortId } from '../utilities/shortid';
import { Card } from 'types/card';
import { Player } from 'types/player';

export class PlayerStore {
    private static DEFAULT_PLAYER_SCORE = 10000;
    private static database: firebase.database.Database;
    private static subscribers;
    private static initialized: boolean;

    public static subscribeToPlayer(playerId: string, updateCallback: (snapshot: Player) => void) {
        if (!PlayerStore.initialized) {
            PlayerStore.init();
        }
        const game = PlayerStore.database.ref(`players/${playerId}`);
        PlayerStore.subscribers.push(
            game.on('value', (val: { val: () => Player }) => {
                const value = val.val();
                updateCallback(value as Player);
            })
        );
    }
    public static unsubscribeToPlayer() {
        if (!PlayerStore.initialized) {
            return;
        }

        PlayerStore.subscribers.forEach((sub) => sub.off('value'));
    }

    public static async createPlayer(name: string): Promise<string> {
        if (!PlayerStore.initialized) {
            PlayerStore.init();
        }

        const playerId = shortId();

        const player: Player = {
            id: playerId,
            name,
            hand: [],
            score: PlayerStore.DEFAULT_PLAYER_SCORE,
            isHost: false,
        };

        try {
            await PlayerStore.database.ref(`players/${playerId}`).set(player);
            return playerId;
        } catch (error) {
            console.error(error);
        }
    }

    public static setHand(hand: Card[]) {}

    private static init() {
        if (!firebase.apps.length) {
            firebase.initializeApp(getFirebaseConfig());
        }
        PlayerStore.database = firebase.database();
        PlayerStore.initialized = true;
    }
}

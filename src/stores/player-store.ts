import * as firebase from 'firebase';
import { Card } from 'types/card';
import { Player } from 'types/player';
import { shortId } from 'src/utilities/shortid';
import { getFirebaseConfig } from 'config/firebase-config';

export class PlayerStore {
    private static DEFAULT_PLAYER_SCORE = 10000;
    private static database: firebase.database.Database;
    private static subscribers = [];

    public static async createPlayer(name: string, isHost: boolean): Promise<string> {
        const playerId = shortId();

        const player: Player = {
            id: playerId,
            name,
            hand: [],
            score: PlayerStore.DEFAULT_PLAYER_SCORE,
            isHost,
            declaration: null,
            hasVoted: false,
            haters: [],
            hatersmap: {},
        };

        try {
            await PlayerStore.database.ref(`players/${playerId}`).set(player);
            return playerId;
        } catch (error) {
            console.error(error);
        }
    }

    public static subscribeToPlayer(playerId: string, updateCallback: (snapshot: Player) => void) {
        const player = PlayerStore.database.ref(`players/${playerId}`);
        PlayerStore.subscribers.push(
            player.on('value', (val: { val: () => Player }) => {
                const value = val.val();
                updateCallback(value as Player);
            })
        );
    }

    public static subscribeToHaters(playerId: string, updateCallback: (hater: Player) => void) {
        const player = PlayerStore.database.ref(`players/${playerId}/hatersmap`);
        const players = PlayerStore.database.ref(`players`);
        PlayerStore.subscribers.push(
            player.on('child_added', (child) => {
                const playerId = child.val();
                players.child(playerId).once('value', (val) => {
                    const value = val.val();
                    updateCallback(value as Player);
                });
            })
        );
    }

    public static async updatePlayer(player: Player) {
        await PlayerStore.database.ref(`players/${player.id}`).update(player);
    }

    public static async addHater(playerId: string, haterId: string) {
        try {
            await PlayerStore.database.ref(`players/${playerId}/hatersmap`).push(haterId);
        } catch (e) {
            console.error(e);
        }
    }

    public static unsubscribeToPlayer() {
        PlayerStore.subscribers.forEach((sub) => sub.off('value'));
    }

    public static async setDeclaration(playerId: string, card: Card, cards: Card[]) {
        try {
            await PlayerStore.database.ref(`players/${playerId}`).update({
                declaration: card,
                hand: cards,
                hasVoted: true,
            });
        } catch (e) {
            console.error(e);
        }
    }

    public static async setHasVoted(playerId: string, hasVoted: boolean) {
        try {
            await PlayerStore.database.ref(`players/${playerId}`).update({
                hasVoted,
            });
        } catch (e) {
            console.error(e);
        }
    }

    public static init() {
        if (!firebase.apps.length) {
            firebase.initializeApp(getFirebaseConfig());
        }
        if (!PlayerStore.database) {
            PlayerStore.database = firebase.database();
        }
    }
}

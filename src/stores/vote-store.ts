import * as firebase from 'firebase';
import { getFirebaseConfig } from 'config/firebase-config';

export class VoteStore {
    private static database: firebase.database.Database;
    public static init() {
        if (!firebase.apps.length) {
            firebase.initializeApp(getFirebaseConfig());
        }

        VoteStore.database = firebase.database();
    }

    public static async addDeclaration(gameId: string, playerId: string) {
        await VoteStore.database.ref(`votes/${gameId}/${playerId}`).set({
            id: playerId,
            card: 0,
            haters: [],
        });
    }

    public static async addHater(gameId: string, accusedId: string, haterId: string) {
        await VoteStore.database.ref(`votes/${gameId}/${accusedId}/haters`).push(haterId);
    }

    public static async clearVotes(gameId: string) {}
}

import firebase from 'firebase';
import { getFirebaseConfig } from 'config/firebase-config';

export abstract class BaseStore {
    public static database: firebase.database.Database;

    public static init() {
        if (!firebase.apps.length) {
            firebase.initializeApp(getFirebaseConfig());
            firebase.auth().signInAnonymously();
        }
        if (!BaseStore.database) {
            BaseStore.database = firebase.database();
        }
    }
}

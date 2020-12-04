import * as firebase from 'firebase';
import { getFirebaseConfig } from 'config/firebase-config';

export abstract class BaseStore {
    protected static database: firebase.database.Database;

    public static init() {
        if (!firebase.apps.length) {
            firebase.initializeApp(getFirebaseConfig());
        }
        if (!BaseStore.database) {
            BaseStore.database = firebase.database();
        }
    }
}

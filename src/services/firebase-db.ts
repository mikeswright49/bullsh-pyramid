import * as firebase from 'firebase';
import { shortId } from '../utilities/shortid';
import { GameStage } from '../enums/game-stage';
import { GameState } from 'types/game-state';
import { Hand } from 'types/hand';
import { getFirebaseConfig } from '../../config/firebase-config';

if (!firebase.apps.length) {
    firebase.initializeApp(getFirebaseConfig());
}

const database = firebase.database();

export async function createGame(playerCount: number, tierCount: number): Promise<string> {
    const ID_LENGTH = 4;
    const gameId = shortId(ID_LENGTH);

    let resolve: (value?: unknown) => void, reject: (reason?: any) => void;

    const promise = new Promise<string>((_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
    });

    const gameState = {
        gameStage: GameStage.Initiation,
        activeIndex: 0,
        activeRow: 0,
        playerCount,
        tierCount,
    } as GameState;

    database.ref(`games/${gameId}`).set(gameState, (err) => {
        if (err) {
            reject(err);
        }
        resolve(gameId);
    });

    return promise;
}

export function subscribeToGame(gameId: string, updateCallback: (snapshot: GameState) => void) {
    const game = database.ref(`games/${gameId}`);
    game.on('value', (val) => {
        const value = val.val();
        updateCallback(value as GameState);
    });
}

export function unsubscribeToGame(gameId: string) {
    database.ref(`games/${gameId}`).off();
}

export async function updateGameStage(gameId: string, gameStage: GameStage) {
    database.ref(`games/${gameId}`).update({
        gameStage,
    });
}

export function setHand(gameId: string, hand: Hand) {
    database.ref(`games/${gameId}`).update(hand);
}

export function setActiveCard(gameId: string, index: { activeRow: number; activeIndex: number }) {
    database.ref(`games/${gameId}`).update(index);
}

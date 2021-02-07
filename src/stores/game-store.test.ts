import firebase from 'firebase';
import { GameStore } from './game-store';
import { shortId } from '../utilities/shortid';

jest.mock('src/utilities/shortid');

describe('Game Store', () => {
    beforeEach(() => {
        (shortId as jest.Mock).mockReturnValue('1234');
    });

    describe('#init', () => {
        it('should initialize the database', () => {
            GameStore.init();
            expect(firebase.initializeApp).toHaveBeenCalledWith({
                apiKey: 'AIzaSyA6gqXeUY6kGKbOWn04KakQ_jBDNj9nNHA',
                appId: '1:692810786736:web:8cd9b46177a733fdc7d875',
                authDomain: 'bullshi-t-pyramid-staging.firebaseapp.com',
                databaseURL: 'https://bullshi-t-pyramid-staging.firebaseio.com',
                measurementId: 'G-CGNXZREQFV',
                messagingSenderId: '692810786736',
                projectId: 'bullshi-t-pyramid-staging',
                storageBucket: 'bullshi-t-pyramid-staging.appspot.com',
            });
            expect(firebase.auth).toHaveBeenCalled();
            expect(firebase.auth().signInAnonymously).toHaveBeenCalled();
            expect(firebase.database).toHaveBeenCalled();
        });
    });
    describe('functions', () => {
        beforeEach(() => {
            GameStore.init();
        });
        it('#createGame should create the game', async () => {
            const gameId = await GameStore.createGame({
                playerCount: 4,
                tierCount: 4,
                flipDelay: 1000,
                cardCount: 5,
            });
            expect(GameStore.database.ref).toHaveBeenCalledWith('games/1234');
            expect(GameStore.database.ref().set).toHaveBeenCalledWith({
                activeIndex: 0,
                activeRow: 0,
                cardCount: 5,
                flipDelay: 1000000,
                gameStage: 0,
                id: '1234',
                playerCount: 4,
                tierCount: 4,
            });
            expect(gameId).toBe('1234');
        });

        it('#getPlayers - should return the players list', async () => {
            (GameStore.database.ref().once as jest.Mock).mockReturnValue({
                val: jest.fn().mockReturnValue({ player1: 'playerhash' }),
            });
            const players = await GameStore.getPlayers('1234');
            expect(players).toEqual({
                player1: 'playerhash',
            });
            expect(GameStore.database.ref().once).toBeCalledWith('value');
            expect(GameStore.database.ref).toHaveBeenCalledWith('games/1234/players');
        });
    });
});

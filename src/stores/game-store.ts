import { GameState } from 'types/game-state';
import { Player } from 'types/player';
import { Card } from 'types/card';
import { shortId } from 'src/utilities/shortid';
import { GameStage } from 'src/enums/game-stage';
import { BaseStore } from './base-store';
const ID_LENGTH = 4;

export class GameStore extends BaseStore {
    private static subscribers = [];

    public static async createGame({
        playerCount,
        tierCount,
        flipDelay,
        cardCount,
    }: {
        playerCount: number;
        tierCount: number;
        flipDelay: number;
        cardCount: number;
    }): Promise<string> {
        const gameId = shortId(ID_LENGTH);

        const gameState = {
            id: gameId,
            gameStage: GameStage.Initiation,
            activeIndex: 0,
            activeRow: 0,
            playerCount,
            tierCount,
            flipDelay: flipDelay * 1000,
            cardCount,
        } as GameState;

        try {
            await GameStore.database.ref(`games/${gameId}`).set(gameState);
            return gameId;
        } catch (error) {
            console.error(error);
        }
    }

    public static subscribeToGame(gameId: string, updateCallback: (snapshot: GameState) => void) {
        const game = GameStore.database.ref(`games/${gameId}`);
        GameStore.subscribers.push(
            game.on('value', (val) => {
                const value = val.val();
                updateCallback(value as GameState);
            })
        );
    }

    public static subscribeToPlayers(gameId: string, updateCallback: (snapshot: Player) => void) {
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

    public static async getPlayers(gameId: string): Promise<{ [key: string]: string }> {
        const reference = await GameStore.database.ref(`games/${gameId}/players`).once('value');
        return reference.val();
    }

    public static async joinGame(gameId: string, playerId: string) {
        await GameStore.database.ref(`games/${gameId}/players`).push(playerId);
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
}

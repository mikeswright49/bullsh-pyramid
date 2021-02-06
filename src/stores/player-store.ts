import { Card } from 'types/card';
import { Player } from 'types/player';
import { shortId } from 'src/utilities/shortid';
import { BaseStore } from './base-store';

export class PlayerStore extends BaseStore {
    private static DEFAULT_PLAYER_SCORE = 10000;
    private static subscribers = [];

    public static async createPlayer(name: string, isHost: boolean): Promise<string> {
        const playerId = shortId();

        const player: Player = {
            id: playerId,
            name,
            hand: [],
            score: PlayerStore.DEFAULT_PLAYER_SCORE,
            isHost,
            declaration: [],
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

    public static async getPlayer(playerId: string) {
        const players = PlayerStore.database.ref(`players`);
        const playerRef = await players.child(playerId).once('value');
        return playerRef.val() as Player;
    }

    public static async updatePlayer(player: Player) {
        await PlayerStore.database.ref(`players/${player.id}`).update(player);
    }

    public static unsubscribeToPlayer() {
        PlayerStore.subscribers.forEach((sub) => sub.off('value'));
    }

    public static async setDeclaration(playerId: string, declaration: Card[]) {
        try {
            await PlayerStore.database.ref(`players/${playerId}`).update({
                declaration,
            });
        } catch (e) {
            console.error(e);
        }
    }
}

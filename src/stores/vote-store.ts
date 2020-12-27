import { BaseStore } from './base-store';
import { shortId } from 'src/utilities/shortid';
import { Vote } from 'types/vote';
import { Card } from 'types/card';
import { PlayerStore } from './player-store';
import { Player } from 'types/player';

export class VoteStore extends BaseStore {
    public static async createVote({
        amount,
        playerId,
        targetId,
        card,
    }: {
        amount: number;
        playerId: string;
        targetId: string;
        card: Card;
    }): Promise<string> {
        const voteId = shortId();
        try {
            await VoteStore.database.ref(`votes/${voteId}`).set({ amount, card });
            await VoteStore.database.ref(`votes/${voteId}/playerref`).push(playerId);
            await VoteStore.database.ref(`votes/${voteId}/targetref`).push(targetId);
            return voteId;
        } catch (error) {
            console.error(error);
        }
    }

    public static async addVote(gameId: string, voteId: string) {
        try {
            await VoteStore.database.ref(`/games/${gameId}/votes`).push(voteId);
        } catch (error) {
            console.error(error);
        }
    }

    public static async getTarget(voteId: string): Promise<Player> {
        const ref = VoteStore.database.ref(`votes/${voteId}/targetref`);
        return VoteStore.getPlayerRef(ref);
    }

    public static async getPlayer(voteId: string): Promise<Player> {
        const ref = VoteStore.database.ref(`votes/${voteId}/playerref`);
        return VoteStore.getPlayerRef(ref);
    }

    public static async removeVotes(gameId: string) {
        try {
            const votes = await VoteStore.database.ref(`/games/${gameId}/votes`).once('value');
            await Promise.all(
                votes.val().map((childId: string) => {
                    return votes.child(childId).ref.remove();
                })
            );
        } catch (error) {
            console.error(error);
        }
    }

    public static subscribeToVotes(gameId: string, callback: (vote: Vote) => void) {
        if (!gameId) {
            return;
        }
        const game = VoteStore.database.ref(`games/${gameId}/votes`);
        const votes = VoteStore.database.ref(`votes`);
        game.on('child_added', (child) => {
            const voteId = child.val();
            votes.child(voteId).on('value', async (val) => {
                const value: Vote = val.val();
                value.id = voteId;
                value.player = await VoteStore.getPlayer(voteId);
                value.target = await VoteStore.getTarget(voteId);
                callback(value as Vote);
            });
        });
    }

    private static async getPlayerRef(ref: firebase.database.Reference): Promise<Player> {
        const playerId: string = (await ref.once('child_added')).val();
        return PlayerStore.getPlayer(playerId);
    }
}

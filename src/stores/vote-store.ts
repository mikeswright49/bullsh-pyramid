import { BaseStore } from './base-store';
import { shortId } from 'src/utilities/shortid';
import { Vote } from 'types/vote';
import { Card } from 'types/card';

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

    public static async removeVotes(gameId: string) {
        try {
            await VoteStore.database.ref(`/games/${gameId}/votes`).remove();
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
            const playerId = child.val();
            votes.child(playerId).on('value', (val) => {
                const value = val.val();
                callback(value as Vote);
            });
        });
    }
}

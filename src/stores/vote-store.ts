import { BaseStore } from './base-store';
import { shortId } from 'src/utilities/shortid';
import { Vote } from 'types/vote';

export class VoteStore extends BaseStore {
    public static async createVote(vote: Vote): Promise<string> {
        const voteId = shortId();
        try {
            await VoteStore.database.ref(`votes/${voteId}`).set(vote);
            return voteId;
        } catch (error) {
            console.error(error);
        }
    }

    public static subscribeToVotes(gameId: string, callback: (vote: Vote) => void) {
        if (!gameId) {
            return;
        }
        if (callback) {
            console.log('setup correctly');
        }
        return null;
    }
}

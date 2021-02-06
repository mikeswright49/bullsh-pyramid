import { isEmpty } from 'lodash';
import React, { useContext } from 'react';
import { PlayerContext } from 'src/providers/player-provider';
import { VotesContext } from 'src/providers/votes-provider';
import { Vote } from 'types/vote';
import { VoteStore } from 'src/stores/vote-store';

export function PlayerBullshit() {
    const player = useContext(PlayerContext);
    const votes = useContext(VotesContext);

    function onVoted(vote: Vote, accepted: boolean) {
        if (accepted) {
            VoteStore.updateVote({
                id: vote.id,
                accepted: true,
            });
        } else {
            VoteStore.updateVote({
                id: vote.id,
                bullshit: true,
            });
        }
    }

    return (
        <>
            {!isEmpty(votes) ? (
                <div className="stack-y-2">
                    <h3 className="stack-y-2">The following people are on the hook</h3>
                    {votes
                        .sort((a: Vote, b: Vote) => {
                            return a.target.name > b.target.name ? -1 : 1;
                        })
                        .map((vote) => (
                            <div
                                key={vote.id}
                                className="stack-y-4 row"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                {vote.player.name} has assigned {vote.target.name} {vote.amount}{' '}
                                &quot;points&quot;
                                {player.id === vote.target.id && !vote.accepted && !vote.bullshit && (
                                    <>
                                        <button
                                            className="stack-x-2"
                                            onClick={() => onVoted(vote, true)}
                                        >
                                            &#9989;
                                        </button>
                                        <button onClick={() => onVoted(vote, false)}>
                                            &#128169;
                                        </button>
                                    </>
                                )}
                                {vote.accepted && (
                                    <span>{vote.target.name} accepted that they suck</span>
                                )}
                                {vote.bullshit && (
                                    <span>
                                        {vote.target.name} said that {vote.player.name} is full of
                                        it
                                    </span>
                                )}
                            </div>
                        ))}
                </div>
            ) : (
                <div className="stack-y-2">
                    <h3>No one says they had it</h3>
                </div>
            )}
        </>
    );
}

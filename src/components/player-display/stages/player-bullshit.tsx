import { isEmpty } from 'lodash';
import React, { useContext } from 'react';
import { PlayerContext } from 'src/providers/player-provider';
import { VotesContext } from 'src/providers/votes-provider';

export function PlayerBullshit() {
    const player = useContext(PlayerContext);
    const { votes } = useContext(VotesContext);
    console.log(votes);
    return (
        <>
            {!isEmpty(votes) ? (
                <div className="stack-y-2">
                    <h3 className="stack-y-2">The following people are on the hook</h3>
                    {votes
                        .sort((a, b) => {
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
                                {player.id === vote.target.id && (
                                    <>
                                        <button className="stack-x-2">&#9989;</button>
                                        <button>&#128169;</button>
                                    </>
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

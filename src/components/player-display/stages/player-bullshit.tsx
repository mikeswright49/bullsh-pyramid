import { isEmpty } from 'lodash';
import React, { useContext } from 'react';
import { PlayerContext } from 'src/providers/player-provider';
import { VotesContext } from 'src/providers/votes-provider';
import { Vote } from 'types/vote';
import { VoteStore } from 'src/stores/vote-store';
import { TranslationContext } from 'src/providers/translation-provider';

export function PlayerBullshit() {
    const player = useContext(PlayerContext);
    const votes = useContext(VotesContext);
    const { translate } = useContext(TranslationContext);

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
                    <h3 className="stack-y-2">
                        {translate('player.display.stage.bullshit.hascards.title')}
                    </h3>
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
                                {translate('player.display.stage.bullshit.assignment.detail', {
                                    playerName: vote.player.name,
                                    targetName: vote.target.name,
                                    amount: vote.amount,
                                })}
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
                                {vote.accepted &&
                                    translate('player.display.stage.bullshit.assignment.accepted', {
                                        playerName: vote.player.name,
                                        targetName: vote.target.name,
                                    })}
                                {vote.bullshit &&
                                    translate('player.display.stage.bullshit.assignment.declined', {
                                        playerName: vote.player.name,
                                        targetName: vote.target.name,
                                    })}
                            </div>
                        ))}
                </div>
            ) : (
                <div className="stack-y-2">
                    <h3>{translate('player.display.stage.bullshit.nocards.title')}</h3>
                </div>
            )}
        </>
    );
}

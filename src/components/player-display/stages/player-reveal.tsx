import { isEmpty } from 'lodash';
import React, { useContext } from 'react';
import { GameContext } from 'src/context/game-context';
import { PlayersContext } from 'src/context/players-context';

export function PlayerReveal() {
    const players = useContext(PlayersContext);
    const gameState = useContext(GameContext);
    const { activeRow, activeIndex } = gameState;

    const activeCard = gameState.tiers[activeRow][activeIndex];

    const activeCardValue = activeCard.value;
    const liars = players.filter(
        (otherPlayer) =>
            otherPlayer.declaration && otherPlayer.declaration.value !== activeCardValue
    );
    const truthers = players.filter(
        (otherPlayer) =>
            otherPlayer.declaration && otherPlayer.declaration.value === activeCardValue
    );
    return (
        <>
            <div className="stack-y-2">
                {isEmpty(truthers) ? (
                    <h3>No one was telling the truth</h3>
                ) : (
                    <>
                        {truthers.map((truther) => {
                            return (
                                <div key={truther.id}>
                                    <h4>{truther.name} was telling the truth</h4>
                                    {!isEmpty(truther.haters) && (
                                        <>
                                            <p>The following people can eat &#128169;</p>
                                            <div>
                                                {truther.haters.map((hater) => (
                                                    <p key={hater.id}>{hater.name}</p>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </>
                )}
                {isEmpty(liars) ? (
                    <h3>No one was lieing</h3>
                ) : (
                    <>
                        {liars.map((liar) => {
                            return (
                                <div key={liar.id}>
                                    <h4>{liar.name} was lieing through their teeth</h4>
                                    {!isEmpty(liar.haters) ? (
                                        <>
                                            <p>
                                                The following people can tell {liar.name} &#128169;
                                            </p>
                                            <div>
                                                {liar.haters.map((hater) => (
                                                    <p key={hater.id}>{hater.name}</p>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <p>
                                            <strong>and got away with it</strong>
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </>
                )}
            </div>
        </>
    );
}

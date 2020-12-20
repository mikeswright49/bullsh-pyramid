import { isEmpty } from 'lodash';
import React, { useContext } from 'react';
import { PlayersContext } from 'src/providers/players-provider';
import { PlayerStore } from 'src/stores/player-store';
import { PlayerContext } from 'src/providers/player-provider';

export function PlayerBullshit() {
    const players = useContext(PlayersContext);
    const player = useContext(PlayerContext);

    const otherDeclaredPlayers = players.filter((otherPlayer) => otherPlayer.declaration);

    function addHater(playerId: string) {
        PlayerStore.addHater(playerId, player.id);
    }

    return (
        <>
            {!isEmpty(otherDeclaredPlayers) ? (
                <div className="stack-y-2">
                    <h3 className="stack-y-2">The following people might be full of shit</h3>
                    {otherDeclaredPlayers.map((otherPlayer) => {
                        const hasHaters = !isEmpty(otherPlayer.haters);
                        const showHating =
                            otherPlayer.id !== player.id &&
                            (!hasHaters ||
                                !otherPlayer.haters.find((hater) => hater.id === player.id));
                        return (
                            <div
                                key={otherPlayer.id}
                                className="stack-y-4 row"
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <div>
                                    <h4>{otherPlayer.name}</h4>
                                    {hasHaters && (
                                        <>
                                            <div>The following people disagree:</div>
                                            {otherPlayer.haters.map((hater) => (
                                                <p key={hater.id}>{hater.name}</p>
                                            ))}
                                        </>
                                    )}
                                </div>
                                {showHating && (
                                    <button onClick={() => addHater(otherPlayer.id)}>
                                        &#128169;
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="stack-y-2">
                    <h3>No one says they had it</h3>
                </div>
            )}
        </>
    );
}

import { isEmpty } from 'lodash';
import React, { useContext } from 'react';
import { Player } from 'types/player';
import { PlayersContext } from 'src/context/players-context';
import { PlayerStore } from 'src/stores/player-store';

export function PlayerBullshit({ player }: { player: Player }) {
    const players = useContext(PlayersContext);
    const otherDeclaredPlayers = players.filter((otherPlayer) => otherPlayer.declaration);

    function addHater(playerId: string) {
        PlayerStore.addHater(playerId, player.id);
    }

    return (
        <>
            {!isEmpty(otherDeclaredPlayers) ? (
                <div className="stack-y-2">
                    <h3>The following people might be full of shit</h3>
                    {otherDeclaredPlayers.map((otherPlayer) => {
                        const hasHaters = !isEmpty(otherPlayer.haters);
                        const showHating =
                            otherPlayer.id !== player.id &&
                            (!hasHaters ||
                                !otherPlayer.haters.find((hater) => hater.id === player.id));
                        return (
                            <div key={otherPlayer.id} className="stack-y-4 row">
                                <div className="col-8">
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
                                    <div className="col-4 flex-center-center">
                                        <button onClick={() => addHater(otherPlayer.id)}>
                                            &#128169;&nbsp;&nbsp;
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="stack-y-2">
                    <h3>No one had it</h3>
                </div>
            )}
        </>
    );
}

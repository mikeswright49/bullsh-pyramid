import { isEmpty } from 'lodash';
import React, { useContext } from 'react';
import { Player } from 'types/player';
import { PlayersContext } from 'src/context/players-context';
import { PlayerStore } from 'src/stores/player-store';

export function PlayerBullshit({ player }: { player: Player }) {
    const players = useContext(PlayersContext);
    const otherPlayers = players.filter((otherPlayer) => player.id !== otherPlayer.id);
    const otherDeclaredPlayers = otherPlayers.filter((otherPlayers) => otherPlayers.declaration);

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
                        return (
                            <div key={otherPlayer.id} className="stack-y-4 row">
                                <div className="col8">
                                    <h4>{otherPlayer.name} says they have it</h4>
                                    {hasHaters && (
                                        <>
                                            <div>The following people disagree:</div>
                                            {otherPlayer.haters.map((hater) => (
                                                <p key={hater.id}>{hater.name}</p>
                                            ))}
                                        </>
                                    )}
                                </div>
                                {(!hasHaters ||
                                    !otherPlayer.haters.find(
                                        (hater) => hater.id === player.id
                                    )) && (
                                    <div className="col4">
                                        <button onClick={() => addHater(otherPlayer.id)}>
                                            Fuck that guy
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="stack-y-2">
                    <h3>Apparently no one here has the balls</h3>
                </div>
            )}
        </>
    );
}
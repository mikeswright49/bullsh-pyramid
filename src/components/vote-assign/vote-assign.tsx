import React, { useContext, useRef, useState } from 'react';
import { PlayersContext } from 'src/providers/players-provider';
import { PlayerContext } from 'src/providers/player-provider';
import { VoteStore } from 'src/stores/vote-store';
import { GameContext } from 'src/providers/game-provider';

export function VoteAssign({ count }: { count: number }) {
    const players = useContext(PlayersContext);
    const player = useContext(PlayerContext);
    const gameState = useContext(GameContext);

    const [errorMessage, setErrorMessage] = useState('');

    const otherPlayers = players.filter((otherPlayer) => otherPlayer.id !== player.id);
    const voteInputs = useRef([]);

    async function createVotes(event: React.FormEvent): Promise<void> {
        event.preventDefault();
        let totalVotes = 0;
        const assignedPlayers = [];

        voteInputs.current.forEach((input, index) => {
            const assigned = parseInt(input.value, 10);
            totalVotes += assigned;
            if (assigned > 0) {
                assignedPlayers.push({
                    playerId: player.id,
                    targetId: otherPlayers[index],
                    amount: assigned,
                });
            }
        });

        if (totalVotes !== count) {
            setErrorMessage('You must assign votes out');
            return;
        }

        await Promise.all(
            assignedPlayers.map(async (assignee) => {
                const voteId = await VoteStore.createVote(assignee);
                VoteStore.addVote(gameState.id, voteId);
            })
        );
    }

    return (
        <div>
            <h3>Assign your votes out</h3>
            <form onSubmit={createVotes} data-testid="host-form">
                <div className="row">
                    <h4 className="col-8-sm">Player name</h4>
                    <h4 className="col-3-sm">Points</h4>
                </div>
                {otherPlayers.map((player, index) => {
                    return (
                        <div key={player.id} className="row">
                            <label className="col-8-sm" htmlFor={`player-${player.id}-amount`}>
                                {player.name}
                            </label>
                            <input
                                className="col-3-sm"
                                type="number"
                                defaultValue={0}
                                max={10}
                                ref={(ref) => (voteInputs.current[index] = ref)}
                                name={`player-${player.id}-amount`}
                            ></input>
                        </div>
                    );
                })}
                {errorMessage && <div>{errorMessage}</div>}
                <button type="submit">All done</button>
            </form>
        </div>
    );
}

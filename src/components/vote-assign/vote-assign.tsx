import React, { useContext, useRef, useState } from 'react';
import { PlayersContext } from 'src/providers/players-provider';
import { PlayerContext } from 'src/providers/player-provider';
import { VoteStore } from 'src/stores/vote-store';
import { GameContext } from 'src/providers/game-provider';
import { Card as CardType } from 'types/card';
import { Card } from '../card/card';
export interface VoteAssignProps {
    card: CardType;
}

export function VoteAssign({ card }: VoteAssignProps) {
    const players = useContext(PlayersContext);
    const player = useContext(PlayerContext);
    const gameState = useContext(GameContext);

    const [errorMessage, setErrorMessage] = useState('');
    const voteInputs = useRef([]);
    const [submitted, setSubmitted] = useState(false);

    const otherPlayers = players.filter((otherPlayer) => otherPlayer.id !== player.id);
    const count = gameState.activeRow + 1;

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
                    targetId: otherPlayers[index].id,
                    amount: assigned,
                    card,
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
                await VoteStore.addVote(gameState.id, voteId);
            })
        );

        setSubmitted(true);
    }

    return (
        <div data-testid="vote-assign">
            {!submitted ? (
                <>
                    <h4>Assign {count} &quot;points&quot; out</h4>
                    <form
                        onSubmit={createVotes}
                        data-testid="vote-assign-form"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Card card={card} />
                        <div>
                            <div className="row">
                                <h4 className="col-8-sm">Player name</h4>
                                <h4 className="col-3-sm">Points</h4>
                            </div>
                            {otherPlayers.map((player, index) => {
                                return (
                                    <div key={player.id} className="row">
                                        <label
                                            className="col-8-sm"
                                            htmlFor={`player-${player.id}-amount`}
                                        >
                                            {player.name}
                                        </label>
                                        <input
                                            className="col-3-sm"
                                            type="number"
                                            defaultValue={0}
                                            max={10}
                                            ref={(ref) => (voteInputs.current[index] = ref)}
                                            data-testid={`player-${player.id}-amount`}
                                            name={`player-${player.id}-amount`}
                                        ></input>
                                    </div>
                                );
                            })}
                            {errorMessage && <div>{errorMessage}</div>}
                            <button type="submit">All done</button>
                        </div>
                    </form>
                </>
            ) : (
                <h5>That was pretty easy</h5>
            )}
        </div>
    );
}

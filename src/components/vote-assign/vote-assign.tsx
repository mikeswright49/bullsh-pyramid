import React, { useContext, useRef, useState } from 'react';
import { PlayersContext } from 'src/providers/players-provider';
import { PlayerContext } from 'src/providers/player-provider';
import { VoteStore, VoteConfig } from 'src/stores/vote-store';
import { GameContext } from 'src/providers/game-provider';
import { Card } from 'types/card';
import { TranslationContext } from 'src/providers/translation-provider';
import { PlayerStore } from 'src/stores/player-store';
export interface VoteAssignProps {
    card: Card;
}

export function VoteAssign({ card }: VoteAssignProps) {
    const players = useContext(PlayersContext);
    const player = useContext(PlayerContext);
    const gameState = useContext(GameContext);
    const { translate } = useContext(TranslationContext);

    const [errorMessage, setErrorMessage] = useState('');
    const voteInputs = useRef([]);
    const [submitted, setSubmitted] = useState(false);

    const otherPlayers = players.filter((otherPlayer) => otherPlayer.id !== player.id);
    const count = gameState.activeRow + 1;

    async function createVotes(event: React.FormEvent): Promise<void> {
        event.preventDefault();
        let totalVotes = 0;
        const assignedPlayers: VoteConfig[] = [];

        voteInputs.current.forEach((input, index) => {
            const assigned = parseInt(input.value, 10);
            totalVotes += assigned;
            if (assigned > 0) {
                assignedPlayers.push({
                    playerId: player.id,
                    targetId: otherPlayers[index].id,
                    amount: assigned,
                    card,
                    turnKey: `${gameState.activeRow}-${gameState.activeIndex}`,
                });
            }
        });

        if (totalVotes !== count) {
            setErrorMessage('You must assign votes out');
            return;
        }
        player.voteSubmitted++;
        await Promise.all([
            ...assignedPlayers.map(async (assignee) => {
                const voteId = await VoteStore.createVote(assignee);
                await VoteStore.addVote(gameState.id, voteId);
            }),
            PlayerStore.updatePlayer(player),
        ]);

        setSubmitted(true);
    }

    return (
        <div data-testid="vote-assign">
            {!submitted ? (
                <>
                    <h4>{translate('vote.assign.title', { count })}</h4>
                    <form onSubmit={createVotes} data-testid="vote-assign-form">
                        <div className="row">
                            <h4 className="col-8-sm">{translate('global.player_name')}</h4>
                            <h4 className="col-3-sm">{translate('global.points')}</h4>
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
                        <button type="submit">{translate('vote.assign.submit')}</button>
                    </form>
                </>
            ) : (
                <h5>{translate('vote.assign.complete')}</h5>
            )}
        </div>
    );
}

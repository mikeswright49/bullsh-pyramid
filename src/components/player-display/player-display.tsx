import React from 'react';
import { GameStage } from 'src/enums/game-stage';
import { Hand } from '../hand/hand';
import { PlayerStore } from 'src/stores/player-store';
import { Player } from 'types/player';
import { Card } from 'types/card';
import { usePlayers } from 'src/hooks/use-players';
import isEmpty from 'lodash.isempty';

export function PlayerDisplay({
    gameId,
    gameStage,
    player,
}: {
    gameId: string;
    gameStage: GameStage;
    player: Player;
}) {
    const players = usePlayers(gameId);

    const otherPlayers = Object.values(players).filter(
        (otherPlayer) => player.id !== otherPlayer.id
    );

    function onDeclarationSelected(card: Card) {
        PlayerStore.setDeclaration(player.id, card);
    }
    function onDeclarationDeferred() {
        PlayerStore.setHasVoted(player.id, true);
    }
    function addHater(playerId: string) {
        PlayerStore.addHater(playerId, player.id);
    }

    switch (gameStage) {
        case GameStage.Initiation:
            return (
                <>
                    <div className="stack-y-2">
                        <h3>Waiting for the game to start</h3>
                    </div>
                </>
            );
        case GameStage.Memorization:
            return (
                <>
                    <div className="stack-y-2">
                        <h3>You have 30s to remember your cards!</h3>
                        <div className="stack-y-2">
                            <Hand
                                cards={player.hand}
                                showSelector={false}
                                onSelected={onDeclarationSelected}
                            />
                        </div>
                    </div>
                </>
            );
        case GameStage.Flipping:
            return (
                <>
                    <div className="stack-y-2">
                        <h3>Flipping a card</h3>
                        <div className="stack-y-2">
                            <Hand
                                cards={player.hand}
                                showSelector={false}
                                onSelected={onDeclarationSelected}
                            />
                        </div>
                    </div>
                </>
            );
        case GameStage.Declaration:
            return (
                <>
                    <div className="stack-y-2">
                        <h3>Quick 5s! Do you have this card?</h3>
                        <div className="stack-y-2">
                            <Hand
                                cards={player.hand}
                                showSelector={
                                    gameStage === GameStage.Declaration && !player.hasVoted
                                }
                                onSelected={onDeclarationSelected}
                            />
                        </div>
                        <div className="stack-y-2">
                            {gameStage === GameStage.Declaration && !player.hasVoted && (
                                <button onClick={onDeclarationDeferred}>Fuck no</button>
                            )}
                        </div>
                    </div>
                </>
            );
        case GameStage.Bullshit:
            const otherDeclaredPlayers = otherPlayers.filter(
                (otherPlayers) => otherPlayers.declaration
            );
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
                                                        <p>{hater.name}</p>
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
        case GameStage.Memory:
            return (
                <>
                    <div className="stack-y-2">
                        <h3>Well which cards did you have?</h3>
                    </div>
                </>
            );
        case GameStage.Complete:
            return (
                <>
                    <div className="stack-y-2">
                        <h3>Congrats you're soft in the head</h3>
                    </div>
                </>
            );
        default:
            return <h1>Terrible error</h1>;
    }
}

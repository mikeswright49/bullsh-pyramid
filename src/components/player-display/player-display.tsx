import React from 'react';
import { GameStage } from 'src/enums/game-stage';
import { Hand } from '../hand/hand';
import { PlayerStore } from 'src/stores/player-store';
import { Player } from 'types/player';
import { Card as CardType } from 'types/card';
import { usePlayers } from 'src/hooks/use-players';
import isEmpty from 'lodash.isempty';
import { useGameState } from 'src/hooks/use-game-state';

export function PlayerDisplay({ gameId, player }: { gameId: string; player: Player }) {
    const players = usePlayers(gameId);
    const gameState = useGameState(gameId);
    const { gameStage, activeRow, activeIndex } = gameState;

    const otherPlayers = Object.values(players).filter(
        (otherPlayer) => player.id !== otherPlayer.id
    );

    function onDeclarationSelected(card: CardType) {
        PlayerStore.setDeclaration(player.id, card);
    }
    function onDeclarationDeferred() {
        PlayerStore.setHasVoted(player.id, true);
    }
    function addHater(playerId: string) {
        PlayerStore.addHater(playerId, player.id);
    }

    if (!player || !gameState) {
        return null;
    }

    const otherDeclaredPlayers = otherPlayers.filter((otherPlayers) => otherPlayers.declaration);

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
        case GameStage.Reveal:
            const activeCard = gameState.tiers[activeRow][activeIndex];

            const activeCardValue = activeCard.value;
            const liars = Object.values(players).filter(
                (otherPlayer) =>
                    otherPlayer.declaration && otherPlayer.declaration.value !== activeCardValue
            );
            const truthers = Object.values(players).filter(
                (otherPlayer) =>
                    otherPlayer.declaration && otherPlayer.declaration.value === activeCardValue
            );
            return (
                <>
                    <div className="stack-y-2">
                        <h3>This means that</h3>
                        {isEmpty(truthers) ? (
                            <h3>No one was telling the truth</h3>
                        ) : (
                            <>
                                {truthers.map((truther) => {
                                    return (
                                        <div>
                                            <h4>{truther.name} was telling the truth</h4>
                                            {!isEmpty(truther.haters) && (
                                                <>
                                                    <p>
                                                        Therefore the following people can eat shit
                                                    </p>
                                                    <div>
                                                        {truther.haters.map((hater) => (
                                                            <p>{hater.name}</p>
                                                        ))}
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    );
                                })}
                            </>
                        )}
                        <h3>This means that</h3>
                        {isEmpty(liars) ? (
                            <h3>No one was telling the lieing</h3>
                        ) : (
                            <>
                                {liars.map((liar) => {
                                    return (
                                        <div>
                                            <h4>{liar.name} was lieing through their teeth</h4>
                                            {!isEmpty(liar.haters) ? (
                                                <>
                                                    <p>
                                                        Therefore the following people can tell{' '}
                                                        {liar.name} to eat shit
                                                    </p>
                                                    <div>
                                                        {liar.haters.map((hater) => (
                                                            <p>{hater.name}</p>
                                                        ))}
                                                    </div>
                                                </>
                                            ) : (
                                                <p>and got away with it</p>
                                            )}
                                        </div>
                                    );
                                })}
                            </>
                        )}
                    </div>
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

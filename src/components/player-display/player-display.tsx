import React, { useContext } from 'react';
import { GameStage } from 'src/enums/game-stage';
import { Hand } from 'src/components/hand/hand';
import { Player } from 'types/player';
import { GameContext } from 'src/context/game-context';
import { PlayerDeclaration } from './stages/player-declaration';
import { PlayerBullshit } from './stages/player-bullshit';
import { PlayerReveal } from './stages/player-reveal';

export function PlayerDisplay({ player }: { player: Player }) {
    const gameState = useContext(GameContext);
    const { gameStage } = gameState;

    if (!player || !gameState) {
        return null;
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
                            <Hand cards={player.hand} showSelector={false} />
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
                            <Hand cards={player.hand} showSelector={false} />
                        </div>
                    </div>
                </>
            );
        case GameStage.Declaration:
            return <PlayerDeclaration player={player} />;
        case GameStage.Bullshit:
            return <PlayerBullshit player={player} />;
        case GameStage.Reveal:
            return <PlayerReveal />;
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
                        <h3>Congrats you&apos;re soft in the head</h3>
                    </div>
                </>
            );
        default:
            return <h1>Terrible error</h1>;
    }
}

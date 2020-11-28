import React from 'react';
import { GameStage } from 'src/enums/game-stage';
import Link from 'next/link';
import { useContext } from 'react';
import { GameBoard } from 'src/components/game-board/game-board';
import { GameContext } from 'src/context/game-context';
import { GameInitiation } from './stages/game-initiation';
import { GameDeclaration } from './stages/game-declaration';

export function GameDisplay() {
    const gameState = useContext(GameContext);
    const { gameStage } = gameState;

    switch (gameStage) {
        case GameStage.Initiation:
            return <GameInitiation />;
        case GameStage.Memorization:
            return (
                <>
                    <div className="stack-y-2">
                        <h2>You have 30s to remember your cards!</h2>
                    </div>
                    <GameBoard />
                </>
            );
        case GameStage.Flipping:
            return <GameBoard />;
        case GameStage.Declaration:
            return <GameDeclaration />;
        case GameStage.Bullshit:
            return <GameBoard />;
        case GameStage.Reveal:
            return null;
        case GameStage.Memory:
            return (
                <>
                    <div className="stack-y-2">
                        <h2>Well which cards did you have?</h2>
                    </div>
                </>
            );
        case GameStage.Complete:
            return (
                <>
                    <div className="stack-y-2">
                        <h2>Well time for a new game</h2>
                        <button className="pure-button pure-button-primary">
                            Start a new game with same players
                        </button>
                        <Link href="/game/host">
                            <button className="pure-button pure-button-secondary">
                                Host a new game
                            </button>
                        </Link>
                    </div>
                </>
            );
        default:
            return <h1>Terrible error</h1>;
    }
}

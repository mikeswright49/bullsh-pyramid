import React from 'react';
import { GameStage } from 'src/enums/game-stage';

export function PlayerDisplay({ gameStage }) {
    switch (gameStage) {
        case GameStage.Initiation:
            return (
                <>
                    <div className="stack-y-2">
                        <h2>Waiting for the game to start</h2>
                    </div>
                </>
            );
        case GameStage.Memorization:
            return (
                <>
                    <div className="stack-y-2">
                        <h2>You have 30s to remember your cards!</h2>
                    </div>
                </>
            );
        case GameStage.Flipping:
            return (
                <>
                    <div className="stack-y-2">
                        <h2>Flipping a card</h2>
                    </div>
                </>
            );
        case GameStage.Declaration:
            return (
                <>
                    <div className="stack-y-2">
                        <h2>Quick 5s! Do you have this card?</h2>
                    </div>
                </>
            );
        case GameStage.Bullshit:
            return (
                <>
                    <div className="stack-y-2">
                        <h2>Did anyone have this card?</h2>
                    </div>
                </>
            );
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
                        <h2>Congrats you're soft in the head</h2>
                    </div>
                </>
            );
        default:
            return <h1>Terrible error</h1>;
    }
}

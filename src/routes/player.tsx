import React, { useContext } from 'react';
import { PlayerContext } from 'src/providers/player-provider';
import { HostDisplay } from 'src/components/host-display/host-display';
import { PlayerDisplay } from 'src/components/player-display/player-display';
import { GameBoard } from 'src/components/game-board/game-board';
import { GameContext } from 'src/providers/game-provider';
import { GameType } from 'types/game-state';
import { OpenDisplay } from 'src/components/open-display/open-display';

export function PlayerRoute() {
    const player = useContext(PlayerContext);
    const gameState = useContext(GameContext);
    if (!player) {
        return null;
    }
    return (
        <div data-testid="player-route">
            <div className="row">
                <div className="col-3">
                    {player.isHost && <HostDisplay />}
                    {gameState.gameType === GameType.Standard && <PlayerDisplay />}
                    {gameState.gameType === GameType.Open && <OpenDisplay />}
                </div>
                <div className="col-9">
                    <GameBoard />
                </div>
            </div>
        </div>
    );
}

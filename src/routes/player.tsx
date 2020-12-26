import React, { useContext } from 'react';
import { PlayerContext } from 'src/providers/player-provider';
import { HostDisplay } from 'src/components/host-display/host-display';
import { PlayerDisplay } from 'src/components/player-display/player-display';
import { GameBoard } from 'src/components/game-board/game-board';

export function PlayerRoute() {
    const player = useContext(PlayerContext);
    if (!player) {
        return null;
    }
    return (
        <div className="container" data-testid="player-route">
            <div className="row">
                <div className="col-3">
                    {player.isHost && <HostDisplay />}
                    <PlayerDisplay player={player} />
                </div>
                <div className="col-9">
                    <GameBoard />
                </div>
            </div>
        </div>
    );
}

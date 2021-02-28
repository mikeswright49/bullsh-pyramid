import React, { useContext } from 'react';
import { GameContext } from 'src/providers/game-provider';
import { PlayerContext } from 'src/providers/player-provider';
import { PlayersContext } from 'src/providers/players-provider';
import { GameStage } from 'src/enums/game-stage';
import { Hand } from '../hand/hand';
import { Card } from 'types/card';
import { PlayerStore } from 'src/stores/player-store';
import { TranslationContext } from 'src/providers/translation-provider';
import { PlayerInitiation } from '../player-display/stages/player-initiation';
import { PlayerMemorization } from '../player-display/stages/player-memorization';

const FLIP_TIMEOUT = 3000;
export function OpenDisplay() {
    const gameState = useContext(GameContext);
    const player = useContext(PlayerContext);
    const players = useContext(PlayersContext);
    const { translate } = useContext(TranslationContext);

    const { gameStage } = gameState;

    if (!player || !gameState) {
        return null;
    }

    function flipPlayerCard(card: Card) {
        card.hidden = false;
        PlayerStore.updatePlayer(player);
        setTimeout(() => {
            card.hidden = true;
            PlayerStore.updatePlayer(player);
        }, FLIP_TIMEOUT);
    }

    function renderOpenDisplay() {
        switch (gameStage) {
            case GameStage.Initiation:
                return <PlayerInitiation />;
            case GameStage.Memorization:
                return <PlayerMemorization />;
            case GameStage.Flipping:
                return (
                    <>
                        <div className="stack-y-2">
                            <h3>{translate('global.your_hand')}</h3>
                            <Hand cards={player.hand} onSelected={flipPlayerCard} />
                        </div>
                        {players
                            .filter((otherPlayer) => otherPlayer.id !== player.id)
                            .map((otherPlayer) => (
                                <div className="stack-y-2" key={otherPlayer.id}>
                                    <h5>
                                        {translate('global.player')}: {otherPlayer.name}
                                    </h5>
                                    <Hand cards={otherPlayer.hand} />
                                </div>
                            ))}
                    </>
                );
            default:
                return null;
        }
    }

    return <div data-testid="open-display">{renderOpenDisplay()}</div>;
}

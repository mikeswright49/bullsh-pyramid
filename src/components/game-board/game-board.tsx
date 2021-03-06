import React, { useContext } from 'react';
import { GameContext } from 'src/providers/game-provider';

import { GameStage } from 'src/enums/game-stage';
import { Pyramid } from 'src/components/pyramid/pyramid';
import { useDeviceSize, Breakpoint } from 'src/hooks/use-device-size';
import { Card } from 'src/components/card/card';
import { TranslationContext } from 'src/providers/translation-provider';

export function GameBoard() {
    const { breakpoint } = useDeviceSize();
    const { gameStage, tiers, activeIndex, activeRow } = useContext(GameContext);
    const { translate } = useContext(TranslationContext);
    if (gameStage === GameStage.Initiation) {
        return <span data-testid="at-game-board"></span>;
    }

    return breakpoint > Breakpoint.MD ? (
        <div className="flex-center-center" data-testid="at-game-board">
            <Pyramid tiers={tiers} />
        </div>
    ) : (
        <div className="stack-y-2" data-testid="mobile-game-board">
            <h3>{translate('game.board.current.row', { activeRow: activeRow + 1 })}</h3>
            <h3>{translate('game.board.current.card')}</h3>
            <Card card={tiers[activeRow][activeIndex]} />
        </div>
    );
}

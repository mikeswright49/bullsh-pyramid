import { GameState } from 'types/game-state';
import { GameStore } from 'src/stores/game-store';
import { GameStage } from 'src/enums/game-stage';

export function transitionToDeclaration(gameState: GameState) {
    const { id, activeRow, activeIndex, tiers } = gameState;
    tiers[activeRow][activeIndex].hidden = false;
    GameStore.updateTiers(id, tiers);
    GameStore.updateGameStage(id, GameStage.Declaration);
}

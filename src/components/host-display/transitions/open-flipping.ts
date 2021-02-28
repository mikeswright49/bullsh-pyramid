import { GameState } from 'types/game-state';
import { GameStore } from 'src/stores/game-store';

export async function openFlipping(gameState: GameState) {
    const { activeIndex, activeRow, id, tiers } = gameState;
    tiers[activeRow][activeIndex].hidden = false;
    const updatedIndex = (activeIndex + 1) % gameState.tiers[activeRow].length;
    const updatedRow = updatedIndex === 0 ? activeRow + 1 : activeRow;

    await GameStore.updateTiers(id, tiers);
    await GameStore.setActiveCard(id, {
        ...gameState,
        activeRow: updatedRow,
        activeIndex: updatedIndex,
    });
}

import { GameState } from 'types/game-state';
import { GameStore } from 'src/stores/game-store';
import { GameStage } from 'src/enums/game-stage';
import { Player } from 'types/player';
import { PlayerStore } from 'src/stores/player-store';
import { transitionToDeclaration } from './to-declaration';

export async function transitionFromReveal(players: Player[], gameState: GameState) {
    const { activeIndex, activeRow, id: gameId } = gameState;
    await Promise.all(
        players.map(async (player) => {
            player.declaration = null;
            player.hand.forEach((card) => (card.hidden = true));
            await PlayerStore.updatePlayer(player);
        })
    );

    if (activeRow === gameState.tierCount - 1 && activeIndex === 0) {
        GameStore.updateGameStage(gameId, GameStage.Memory);
    } else {
        const updatedIndex = (activeIndex + 1) % gameState.tiers[activeRow].length;
        const updatedRow = updatedIndex === 0 ? activeRow + 1 : activeRow;
        // need to overwrite local state, as there is a desync period where the BE has gotten the write,
        // but the event hasn't published fully yet
        gameState = {
            ...gameState,
            activeRow: updatedRow,
            activeIndex: updatedIndex,
        };
        await GameStore.setActiveCard(gameId, gameState);
        await transitionToDeclaration(gameState);
    }
}

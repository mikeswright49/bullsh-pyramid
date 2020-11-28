import { GameState } from 'types/game-state';
import { GameStore } from 'src/stores/game-store';
import { GameStage } from 'src/enums/game-stage';
import { Player } from 'types/player';
import { PlayerStore } from 'src/stores/player-store';

export async function transitionFromReveal(players: Player[], gameState: GameState) {
    const { activeIndex, activeRow, id: gameId } = gameState;

    await Promise.all(
        players.map(async (player) => {
            player.hasVoted = false;
            player.declaration = null;
            player.hatersmap = null;
            player.haters = null;
            await PlayerStore.updatePlayer(player);
        })
    );

    if (activeRow === gameState.tierCount - 1 && activeIndex === 0) {
        GameStore.updateGameStage(gameId, GameStage.Memory);
    } else {
        const updatedIndex = (activeIndex + 1) % gameState.tiers[activeRow].length;
        const updatedRow = updatedIndex === 0 ? activeRow + 1 : activeRow;
        GameStore.setActiveCard(gameId, {
            activeRow: updatedRow,
            activeIndex: updatedIndex,
        });
        GameStore.updateGameStage(gameId, GameStage.Flipping);
    }
}

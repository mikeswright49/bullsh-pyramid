import { GameState } from 'types/game-state';
import { GameStore } from 'src/stores/game-store';
import { GameStage } from 'src/enums/game-stage';
import { Player } from 'types/player';
import { PlayerStore } from 'src/stores/player-store';

export async function transitionToFlipping(players: Player[], gameState: GameState) {
    const updates = [];
    for (const playerId in players) {
        const player = players[playerId];
        player.hand.forEach((card) => (card.hidden = true));
        updates.push(PlayerStore.updatePlayer(player));
    }
    await Promise.all(updates);
    GameStore.updateGameStage(gameState.id, GameStage.Flipping);
}

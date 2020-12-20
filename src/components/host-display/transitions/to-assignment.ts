import { GameStore } from 'src/stores/game-store';
import { GameStage } from 'src/enums/game-stage';

export function transitionToAssignment(gameId: string) {
    GameStore.updateGameStage(gameId, GameStage.Assign);
}

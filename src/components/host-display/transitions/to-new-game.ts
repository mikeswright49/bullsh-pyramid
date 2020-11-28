import { GameStore } from 'src/stores/game-store';
import { GameStage } from 'src/enums/game-stage';

export function transitionToNewGame(gameId: string) {
    GameStore.updateGameStage(gameId, GameStage.Complete);
}

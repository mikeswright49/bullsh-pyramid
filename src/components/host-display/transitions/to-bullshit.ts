import { GameStore } from 'src/stores/game-store';
import { GameStage } from 'src/enums/game-stage';

export function transitionToBullshit(gameId: string) {
    GameStore.updateGameStage(gameId, GameStage.Bullshit);
}

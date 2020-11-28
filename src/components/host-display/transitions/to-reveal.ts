import { GameStore } from 'src/stores/game-store';
import { GameStage } from 'src/enums/game-stage';

export function transitionToReveal(gameId: string) {
    GameStore.updateGameStage(gameId, GameStage.Reveal);
}

import { GameState } from 'types/game-state';
import { GameStore } from 'src/stores/game-store';
import { GameStage } from 'src/enums/game-stage';
import { Player } from 'types/player';
import { PlayerStore } from 'src/stores/player-store';
import { dealHand, generateDeck } from 'src/utilities/cards';

export async function transitionToMemorization(
    players: Player[],
    gameState: GameState
): Promise<void> {
    const hand = dealHand(generateDeck(), gameState.tierCount, players.length);
    await Promise.all(
        players.map((player, index) => {
            const playerHand = hand.players[index];
            player.hand = playerHand;
            return PlayerStore.updatePlayer(player);
        })
    );

    GameStore.updateTiers(gameState.id, hand.tiers);
    GameStore.updateGameStage(gameState.id, GameStage.Memorization);
}

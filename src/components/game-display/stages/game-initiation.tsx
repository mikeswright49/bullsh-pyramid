import React, { useContext } from 'react';
import { GameContext } from 'src/context/game-context';
import { dealHand, generateDeck } from 'src/utilities/cards';
import { PlayerStore } from 'src/stores/player-store';
import { GameStore } from 'src/stores/game-store';
import { GameStage } from 'src/enums/game-stage';
import Link from 'next/link';
import { PlayerList } from 'src/components/player-list/player-list';
import { PlayersContext } from 'src/context/players-context';

export function GameInitiation() {
    const gameState = useContext(GameContext);
    const players = useContext(PlayersContext);
    const { id: gameId } = gameState;

    async function transitionToMemorization(event: { preventDefault: () => void }): Promise<void> {
        event.preventDefault();

        const hand = dealHand(generateDeck(), gameState.tierCount, players.length);
        await Promise.all(
            players.map((player, index) => {
                const playerHand = hand.players[index];
                player.hand = playerHand;
                return PlayerStore.updatePlayer(player);
            })
        );

        GameStore.updateTiers(gameId, hand.tiers);
        GameStore.updateGameStage(gameId, GameStage.Memorization);
    }

    return (
        <>
            <div className="stack-y-2">
                <h2>To join the game go to:</h2>
                <ul>
                    <li>
                        <Link href={`/game/join/${gameId}`}>
                            <a>Go to the join screen</a>
                        </Link>
                    </li>
                    <li>
                        Or type in <strong>{gameId}</strong> at
                        https://bullsh-pyramid.now.sh/game/join
                    </li>
                </ul>

                <PlayerList />

                <h3>All players joined!</h3>
                <button
                    className="pure-button pure-button-primary"
                    onClick={transitionToMemorization}
                >
                    Start game
                </button>
            </div>
        </>
    );
}

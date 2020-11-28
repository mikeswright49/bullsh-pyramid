import React from 'react';
import { Hand } from 'src/components/hand/hand';
import { PlayerStore } from 'src/stores/player-store';
import { Card as CardType } from 'types/card';
import { Player } from 'types/player';

export function PlayerDeclaration({ player }: { player: Player }) {
    function onDeclarationSelected(card: CardType) {
        card.hidden = false;
        PlayerStore.setDeclaration(player.id, card, player.hand);
    }
    function onDeclarationDeferred() {
        PlayerStore.setHasVoted(player.id, true);
    }
    return (
        <>
            <div className="stack-y-2">
                <h3>Quick 5s! Do you have this card?</h3>
                <div className="stack-y-2">
                    <Hand
                        cards={player.hand}
                        showSelector={!player.hasVoted}
                        onSelected={onDeclarationSelected}
                    />
                </div>
                <div className="stack-y-2">
                    {!player.hasVoted && <button onClick={onDeclarationDeferred}>Nope</button>}
                </div>
            </div>
        </>
    );
}

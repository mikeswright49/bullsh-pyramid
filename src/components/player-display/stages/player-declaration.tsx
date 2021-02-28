import React, { useContext, useState } from 'react';
import { Hand } from 'src/components/hand/hand';
import { PlayerStore } from 'src/stores/player-store';
import { Card as CardType } from 'types/card';
import { PlayerContext } from 'src/providers/player-provider';

export function PlayerDeclaration() {
    const player = useContext(PlayerContext);
    const [declaredCards, setDeclaredCards] = useState<CardType[]>([]);

    function onDeclarationSelected(card: CardType) {
        const updatedCards = [...declaredCards, card];
        setDeclaredCards(updatedCards);
        player.declaration = updatedCards;
        PlayerStore.updatePlayer(player);
    }

    return (
        <>
            <div className="stack-y-2">
                <h3>Quick 5s! Do you have this card?</h3>
                <div className="stack-y-2">
                    <Hand
                        cards={player.hand}
                        selectedCards={declaredCards}
                        onSelected={onDeclarationSelected}
                    />
                </div>
            </div>
        </>
    );
}

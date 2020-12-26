import styles from './hand.module.css';
import React from 'react';
import { Card } from 'src/components/card/card';
import { Card as CardType } from 'types/card';
import isEmpty from 'lodash.isempty';

export interface HandProps {
    cards: CardType[];
    showSelector: boolean;
    selectedCards?: CardType[];
    onSelected?: (card: CardType) => void;
}
export function Hand({
    cards,
    showSelector,
    onSelected,
    selectedCards = [],
}: HandProps): JSX.Element {
    if (!cards) {
        return null;
    }

    function isCardSelected(card: CardType): boolean {
        if (isEmpty(selectedCards)) {
            return false;
        }

        return !!selectedCards.find(
            (selected) => selected.suit === card.suit && selected.value === card.value
        );
    }

    return (
        <>
            <h3>Your hand</h3>
            <div className={styles.hand}>
                {cards.map((card) => (
                    <div key={`hand-card-${card.value}-${card.suit}`}>
                        <Card card={card} />
                        {showSelector && !isCardSelected(card) && (
                            <button
                                data-testid={`${card.value}-${card.suit}-select-button`}
                                onClick={() => {
                                    !!onSelected && onSelected(card);
                                }}
                            >
                                This one
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}

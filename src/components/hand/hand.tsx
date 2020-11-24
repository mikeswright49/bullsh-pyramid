import { Card } from '../card/card';
import styles from './hand.module.css';
import React from 'react';
import { Card as CardType } from '../../../types/card';

export interface HandProps {
    cards: CardType[];
    showSelector: boolean;
    onSelected: (card: CardType) => void;
}
export function Hand({ cards, showSelector, onSelected }: HandProps): JSX.Element {
    if (!cards) {
        return null;
    }

    return (
        <>
            <h3>Your hand</h3>
            <div className={styles.hand}>
                {cards.map((card) => (
                    <div key={`hand-card-${card.value}-${card.suit}`}>
                        <Card card={card} />
                        {showSelector && (
                            <button
                                data-testid={`${card.value}-${card.suit}-select-button`}
                                onClick={() => onSelected(card)}
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

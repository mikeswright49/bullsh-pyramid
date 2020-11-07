import { Card } from '../card/card';
import styles from './hand.module.css';
import React from 'react';
import { Card as CardType } from '../../../types/card';

export interface HandProps {
    cards: CardType[];
    showSelector: boolean;
}
export function Hand({ cards, showSelector }: HandProps): JSX.Element {
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
                        {showSelector && <button>This one</button>}
                    </div>
                ))}
            </div>
        </>
    );
}

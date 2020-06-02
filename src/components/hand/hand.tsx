import { Card } from '../card/card';
import styles from './hand.module.css';
import React from 'react';
import { Card as CardType } from '../../../types/card';

export function Hand({ cards, name }: { cards: CardType[]; name: string }): JSX.Element {
    return (
        <>
            <h3>Player: {name}</h3>
            <div className={styles.hand}>
                {cards.map((card, idx) => (
                    <Card key={`hand-${name}-card-${idx}`} card={card} />
                ))}
            </div>
        </>
    );
}

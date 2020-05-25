import { Card } from '../card/card';
import { shortId } from '../../utilities/shortid';
import styles from './hand.module.css';
import React from 'react';

export function Hand({
    cards,
    hidden,
    name,
}: {
    cards: number[];
    hidden: boolean;
    name: string;
}): JSX.Element {
    return (
        <>
            <h3>Player: {name}</h3>
            <div className={styles.hand}>
                {cards.map((card) => (
                    <Card key={shortId()} cardValue={card} hidden={hidden} />
                ))}
            </div>
        </>
    );
}

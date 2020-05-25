import React from 'react';
import styles from './card.module.css';
import cn from 'classnames';
import { Card as CardType } from '../../../types/card';

export function Card({ card }: { card: CardType }): JSX.Element {
    return (
        <div
            className={cn('flex-center-center', styles.card, { [styles.cardHidden]: card.hidden })}
        >
            {!card.hidden && card.value}
        </div>
    );
}

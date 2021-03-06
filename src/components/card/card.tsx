import React from 'react';
import styles from './card.module.css';
import cn from 'classnames';
import { Card as CardType } from 'types/card';

const CARD_HEIGHT = 123;
const CARD_WIDTH = 79;

export function Card({
    card,
    onClick,
}: {
    card: CardType;
    onClick?: (card: CardType) => void;
}): JSX.Element {
    return (
        <div
            onClick={() => !!onClick && onClick(card)}
            data-testid={`card-${card.suit}-${card.value}`}
            style={{
                backgroundPosition: `-${card.value * CARD_WIDTH}px -${card.suit * CARD_HEIGHT}px`,
            }}
            className={cn('flex-center-center', styles.card, { [styles.cardHidden]: card.hidden })}
        ></div>
    );
}

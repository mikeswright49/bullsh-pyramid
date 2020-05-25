import React from 'react';
import styles from './card.module.css';
import cn from 'classnames';

export function Card({ cardValue, hidden }: { cardValue: number; hidden: boolean }): JSX.Element {
    return (
        <div className={cn('flex-center-center', styles.card, { hidden })}>
            {!hidden && cardValue}
        </div>
    );
}

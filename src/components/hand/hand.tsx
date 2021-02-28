import styles from './hand.module.css';
import React from 'react';
import { Card } from 'src/components/card/card';
import { Card as CardType } from 'types/card';
import isEmpty from 'lodash.isempty';

export interface HandProps {
    cards: CardType[];
    selectedCards?: CardType[];
    onSelected?: (card: CardType) => void;
}
export function Hand({ cards, onSelected, selectedCards = [] }: HandProps): JSX.Element {
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
                {cards.map((card) => {
                    const isSelected = isCardSelected(card);
                    const isClickable = !!onSelected;
                    return (
                        <div key={`hand-card-${card.value}-${card.suit}`} className={'stack-x-4'}>
                            <div
                                style={{
                                    border: isSelected ? '2px solid green' : 'none',
                                    cursor: isClickable ? 'pointer' : 'auto',
                                }}
                            >
                                <Card
                                    card={card}
                                    onClick={(card) => {
                                        isClickable && onSelected(card);
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

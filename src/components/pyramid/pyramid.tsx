import { Card } from 'src/components/card/card';
import React from 'react';
import { Card as CardType } from 'types/card';

export function Pyramid({ tiers }: { tiers: CardType[][] }) {
    if (!tiers) {
        return null;
    }

    const renderedTiers: CardType[][] = [].concat(tiers).reverse();

    return (
        <div data-testid="at-pyramid">
            {renderedTiers.map((tier, tierIndex) => (
                <div key={`pyramid-tier-${tierIndex}`} className={'flex-center-center stack-y-3'}>
                    {tier.map((card: CardType, cardIndex) => (
                        <span
                            className="stack-x-4"
                            key={`pyramid-tier-${tierIndex}-card-${cardIndex}`}
                        >
                            <Card card={card} />
                        </span>
                    ))}
                </div>
            ))}
        </div>
    );
}

import { Card } from '../card/card';
import { shortId } from '../../utilities/shortid';
import React from 'react';
import { Card as CardType } from '../../../types/card';

export function Pyramid({ tiers }: { tiers: CardType[][] }) {
    const renderedTiers: CardType[][] = [].concat(tiers).reverse();

    return (
        <div data-testid="at-pyramid">
            {renderedTiers.map((tier) => (
                <div key={shortId()} className={'flex-center-center stack-y-3'}>
                    {tier.map((card: CardType) => (
                        <Card key={shortId()} card={card} />
                    ))}
                </div>
            ))}
        </div>
    );
}

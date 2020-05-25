import { Card } from '../card/card';
import { shortId } from '../../utilities/shortid';
import React from 'react';

export function Pyramid({ tiers }: { tiers: number[][] }) {
    const renderedTiers = [].concat(tiers).reverse();

    return (
        <div data-testid="at-pyramid">
            {renderedTiers.map((tier) => (
                <div key={shortId()} className={'flex-center-center stack-y-3'}>
                    {tier.map((card: number) => (
                        <Card key={shortId()} cardValue={card} hidden={false} />
                    ))}
                </div>
            ))}
        </div>
    );
}

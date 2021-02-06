import React, { useContext } from 'react';
import { VotesContext } from 'src/providers/votes-provider';
import { Card } from 'src/components/card/card';
import { Card as CardType } from 'types/card';
import { GameContext } from 'src/providers/game-provider';

export function PlayerReveal() {
    const votes = useContext(VotesContext);
    const gameContext = useContext(GameContext);
    const activeCard = gameContext.tiers[gameContext.activeRow][gameContext.activeIndex];
    return (
        <div className="stack-y-2">
            {votes
                .filter((vote) => vote.bullshit)
                .map((vote) => {
                    const card: CardType = Object.assign({}, vote.card, { hidden: false });
                    const drinker =
                        vote.card.value === activeCard.value ? vote.target.name : vote.player.name;
                    return (
                        <div className="stack-y-2" key={vote.id}>
                            <h4>
                                {vote.target.name} said that {vote.player.name} was full of it for{' '}
                                {vote.amount}, they had:
                            </h4>
                            <Card card={card} />
                            <span>
                                <strong>{drinker}</strong> drinks
                            </span>
                        </div>
                    );
                })}
        </div>
    );
}

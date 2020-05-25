import { getRandomInt } from './random';
import { Card } from 'types/card';
import { GameState } from 'types/game-state';

/**
 * Generates a deck of cards. Cards is customizable now, because I might make euchre
 * @returns a deck of N cards
 */
export function generateDeck(cardsInSuit = 13): Card[] {
    const SUITS = 4;
    const deck = [];
    for (let index = 0; index < SUITS * cardsInSuit; index++) {
        deck[index] = {
            value: index % cardsInSuit,
            suit: Math.floor(index / cardsInSuit),
            hidden: false,
        };
    }

    return deck;
}

/**
 * Generates the players hands
 * @param deck Deck to be generated from
 * @param playerCount number of players
 * @param handSize size of hand that players are playing with
 */
export function generatePlayers(deck: Card[], playerCount: number, handSize = 3): Card[][] {
    const players = [];
    for (let player = 0; player < playerCount; player++) {
        if (!players[player]) {
            players[player] = [];
        }

        for (let card = 0; card < handSize; card++) {
            players[player].push(dealCard(deck));
        }
    }
    return players;
}

/**
 * Generates the game tiers
 * @param deck Deck to be generated from
 * @param tierCount number of tiers
 */
export function generateTiers(deck: Card[], tierCount: number): Card[][] {
    const tiers = [];
    for (let tier = 0; tier < tierCount; tier++) {
        if (!tiers[tier]) {
            tiers[tier] = [];
        }

        for (let card = 0; card < tierCount - tier; card++) {
            const card = dealCard(deck);
            card.hidden = true;
            tiers[tier].push(card);
        }
    }

    return tiers;
}

/**
 * Takes a card and then removes it from the deck
 * @param deck Deck to be dealt from,
 * @returns card dealt
 */
export function dealCard(deck: Card[]) {
    const index = getRandomInt(0, deck.length);
    const [card] = deck.splice(index, 1);
    return card;
}

/**
 * Deals a new hand for a new game
 * @param deck Deck to be dealt from
 * @param tiers Number of tiers to be generated
 * @param players Number of players in the game
 */
export function dealHand(deck: Card[], tiers: number, players: number): GameState {
    const response: GameState = {
        players: [],
        tiers: [],
        flattenedTiers: [],
    };

    response.players = generatePlayers(deck, players);
    response.tiers = generateTiers(deck, tiers);
    response.flattenedTiers = response.tiers.flat();

    return response;
}

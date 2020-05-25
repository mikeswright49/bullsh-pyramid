import { getRandomInt } from './random';

/**
 * Generates a deck of cards. Cards is customizable now, because I might make euchre
 * @returns a deck of N cards
 */
export function generateDeck(cardsInSuit = 13): number[] {
    const SUITS = 4;
    const deck = [];
    for (let i = 0; i < SUITS * cardsInSuit; i++) {
        deck[i] = i % cardsInSuit;
    }

    return deck;
}

/**
 * Generates the players hands
 * @param deck Deck to be generated from
 * @param playerCount number of players
 * @param handSize size of hand that players are playing with
 */
export function generatePlayers(deck: number[], playerCount: number, handSize = 3) {
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
export function generateTiers(deck: number[], tierCount: number) {
    const tiers = [];
    for (let tier = 0; tier < tierCount; tier++) {
        if (!tiers[tier]) {
            tiers[tier] = [];
        }

        for (let card = 0; card < tierCount - tier; card++) {
            tiers[tier].push(dealCard(deck));
        }
    }

    return tiers;
}

/**
 * Takes a card and then removes it from the deck
 * @param deck Deck to be dealt from,
 * @returns card dealt
 */
export function dealCard(deck: number[]) {
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
export function dealHand(deck: number[], tiers: number, players: number) {
    const response = {
        players: [],
        tiers: [],
    };

    response.players = generatePlayers(deck, players);
    response.tiers = generateTiers(deck, tiers);

    return response;
}

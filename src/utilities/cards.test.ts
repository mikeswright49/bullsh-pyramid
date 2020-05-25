import { generateDeck, dealCard, generatePlayers, generateTiers, dealHand } from './cards';

describe('<Unit Test> Cards', () => {
    test('should be able to generate a deck of 4 suits of 13 cards', () => {
        const deck = generateDeck();
        expect(deck.length).toBe(52);
        expect(deck[0]).toBe(0);
        expect(deck[51]).toBe(12);
    });

    test('should be able to deal N players cards', () => {
        const deck = generateDeck();
        const players = generatePlayers(deck, 3);
        expect(players.length).toBe(3);
        expect(players[0].length).toBe(3);
        expect(deck.length).toBe(43); //52 - 3*3 =43
    });

    test('should be able to generate N players cards of X size hands', () => {
        const handSize = 5;
        const playerCount = 3;
        const deck = generateDeck();
        const players = generatePlayers(deck, playerCount, handSize);
        expect(players.length).toBe(playerCount);
        expect(players[0].length).toBe(handSize);
        expect(deck.length).toBe(52 - handSize * playerCount); //52 - 3*3 = 43
    });

    test('should be able to generate N tiers', () => {
        const tierCount = 5;
        const deck = generateDeck();
        const tiers = generateTiers(deck, tierCount);
        expect(tiers.length).toBe(tierCount);
        expect(tiers[0].length).toBe(tierCount);
        expect(tiers[tierCount - 1].length).toBe(1);
        expect(deck.length).toBe(37); //52 - 5+4+3+2+1 = 37
    });

    test('should be able to deal a random card from the deck', () => {
        const deck = [1, 2, 3];
        const card = dealCard(deck);
        expect(card).toBeDefined();
        expect(deck.length).toBe(2);
    });

    test('should be able to deal the players and tiers for a game', () => {
        const playerCount = 3;
        const tierCount = 5;
        const deck = generateDeck();
        const response = dealHand(deck, tierCount, playerCount);

        expect(response.players.length).toBe(playerCount);
        expect(response.tiers.length).toBe(tierCount);
    });
});

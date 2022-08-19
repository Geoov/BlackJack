import { Card, Suite, Rank } from "./Card";

export class DeckOfCards {

  public deck: Card[] = [];
  suites: Suite[] = ["clubs", "diamonds", "hearts", "spades"];
  ranks: Rank[] = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];


  constructor() {
    this.buildDeck();
  }

  buildDeck() {
    this.ranks.forEach(rank => {
      this.suites.forEach(suite => {
        this.deck.push(new Card(rank, suite));
      })
    })
  }

  getDeck() {
    return this.deck;
  }

  drawCard() {
    if (this.deck.length == 0)
      return -1;

    return this.deck.pop();
  }

  shuffleDeck() {
    let currentIndex = this.deck.length, randomIndex;

    while (currentIndex != 0) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [this.deck[currentIndex], this.deck[randomIndex]] = [
        this.deck[randomIndex], this.deck[currentIndex]];
    }

    return this.deck;

  }


}

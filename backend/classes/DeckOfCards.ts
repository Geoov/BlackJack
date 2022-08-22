import { Card, Suite, Rank } from "./Card";

export class DeckOfCards {

  private _deck: Card[] = [];
  _suites: Suite[] = [
    "clubs",
    "diamonds",
    "hearts",
    "spades"
  ];
  _ranks: Rank[] = [
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
    this._ranks.forEach(rank => {
      this._suites.forEach(suite => {
        this._deck.push(new Card(rank, suite));
      })
    })
  }

  public get deck(): Card[] {
    return this._deck;
  }

  drawCard() {
    if (this._deck.length == 0)
      return;

    return this._deck.pop();
  }

  shuffleDeck() {
    let currentIndex = this._deck.length, randomIndex;

    while (currentIndex != 0) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [this._deck[currentIndex], this._deck[randomIndex]] = [
        this._deck[randomIndex], this._deck[currentIndex]];
    }

    return this._deck;

  }


}

export type Suite = "clubs" | "diamonds" | "hearts" | "spades";
export type Rank = "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "A";

export class Card {
  _rank: Rank;
  _suite: Suite;

  constructor(rank: Rank, suite: Suite) {
    this._rank = rank;
    this._suite = suite;
  }

}
export type Suite = "clubs" | "diamonds" | "hearts" | "spades";
export type Rank = "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "A";

export class Card {
  rank: Rank;
  suite: Suite;

  constructor(rank: Rank, suite: Suite) {
    this.rank = rank;
    this.suite = suite;
  }

}
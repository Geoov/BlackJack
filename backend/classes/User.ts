import { Card } from "./Card";

export class User {

  private _id: string;
  private _nickName: string;
  private _ready: boolean;
  private _score: number;
  private _cards: Card[] = [];
  // means the score is bigger or equal than 21 or
  // the player decided to not draw more cards
  private _finished: boolean;

  constructor(id, nickName = 'Unnamed', ready = false, score = 0, cards = [], finished = false) {
    this._id = id;
    this._nickName = nickName;
    this._ready = ready;
    this._score = score;
    this._cards = cards;
    this._finished = finished;
  }

  public get id(): string {
    return this._id;
  }

  public set id(value: string) {
    this._id = value;
  }

  public get nickName(): string {
    return this._nickName;
  }

  public set nickName(value: string) {
    this._nickName = value;
  }

  public get ready(): boolean {
    return this._ready;
  }

  public set ready(value: boolean) {
    this._ready = value;
  }

  public get score(): number {
    return this._score;
  }

  public set score(value: number) {
    this._score = value;
  }

  public get cards(): Card[] {
    return this._cards;
  }
  public set cards(value: Card[]) {
    this._cards = value;
  }

  public get finished(): boolean {
    return this._finished;
  }
  public set finished(value: boolean) {
    this._finished = value;
  }

  public computeScore() {
    let totalScore = 0;

    this.cards.forEach(card => {

      switch (card._rank) {
        case 'J':
        case 'Q':
        case 'K':
          totalScore += 10;
          break;
        case 'A':
          break;
        default:
          totalScore += parseInt(card._rank, 10);
          break;
      }

    })

    let aces = this.cards.filter((card) => { return card._rank === 'A' });
    let noOfAces = aces.length;

    if (noOfAces > 0) {

      if (totalScore > (21 - noOfAces)) {
        totalScore += noOfAces;
      } else if (totalScore <= (11 - noOfAces)) {
        totalScore += 10 + noOfAces;
      } else {
        totalScore += noOfAces
      }

    }

    this._score = totalScore;
  }

}
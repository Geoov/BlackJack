import { DeckOfCards } from "./DeckOfCards";
import { User } from "./User";

export class Game {

  _gameCode: string;
  private _deck: DeckOfCards = new DeckOfCards();
  private _users: User[] = [];

  constructor(gameCode?: string) {
    this._gameCode = gameCode ?? '';
  }

  public get users(): User[] {
    return this._users;
  }

  public set users(value: User[]) {
    this._users = value;
  }

  public get deck(): DeckOfCards {
    return this._deck;
  }
  public set deck(value: DeckOfCards) {
    this._deck = value;
  }


}
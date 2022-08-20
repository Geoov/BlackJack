import { DeckOfCards } from "./DeckOfCards";
import { User } from "./User";

export class Game {

  private _gameCode: string;
  private _deckOfCards: DeckOfCards = new DeckOfCards();
  private _users: User[] = [];

  constructor(gameCode?: string) {
    this._gameCode = gameCode ?? '';
  }

  public get gameCode(): string {
    return this._gameCode;
  }

  public set gameCode(value: string) {
    this._gameCode = value;
  }

  public get users(): User[] {
    return this._users;
  }

  public set users(value: User[]) {
    this._users = value;
  }

  public get deck(): DeckOfCards {
    return this._deckOfCards;
  }
  public set deck(value: DeckOfCards) {
    this._deckOfCards = value;
  }


}
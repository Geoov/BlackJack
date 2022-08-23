import { DeckOfCards } from "./DeckOfCards";
import { User } from "./User";

export class Game {

  private _gameCode: string;
  private _deckOfCards: DeckOfCards;
  private _users: User[] = [];

  constructor(gameCode?: string, gameMode?: string) {
    this._gameCode = gameCode ?? '';
    this._deckOfCards = new DeckOfCards(gameMode);
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

  public get deckOfCards(): DeckOfCards {
    return this._deckOfCards;
  }
  public set deckOfCards(value: DeckOfCards) {
    this._deckOfCards = value;
  }


}
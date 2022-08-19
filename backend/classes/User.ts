export class User {

  private _id: string;
  private _nickName: string;
  private _ready: boolean;
  private _score: number;

  constructor(id, nickName = 'Unnamed', ready = false, score = 0) {
    this._id = id;
    this._nickName = nickName;
    this._ready = ready;
    this._score = score;
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

}
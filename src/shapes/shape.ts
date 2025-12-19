export abstract class Shape {
  private _width: number = 50;
  private _height: number = 50;
  private _x: number = 50;
  private _y: number = 50;
  private _name: string = "test";

  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }

  get width(): number {
    return this._width;
  }
  set width(value: number) {
    this._width = value;
  }

  get height(): number {
    return this._height;
  }
  set height(value: number) {
    this._height = value;
  }

  get x(): number {
    return this._x;
  }
  set x(value: number) {
    this._x = value;
  }

  get y(): number {
    return this._y;
  }
  set y(value: number) {
    this._y = value;
  }

  abstract getPath(): string;
}
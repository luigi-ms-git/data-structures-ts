class LinearStruct {
  private _struct: Array<any>;
  private _length: number;
  private _front: any;
  private _back: any;
  public MAX_LENGTH: number;

  constructor(){
    this._struct = [];
    this._length = 0;
    this._front = undefined;
    this._back = undefined;
    this.MAX_LENGTH = 10;
  }

  public isEmpty(): boolean { return this.length === 0; }

  public isFull(): boolean { return this.length === this.MAX_LENGTH; }

  public getAll(): Array<any> { return this.struct; }

  public get struct(): Array<any> { return this._struct; }

  public set struct(nStruct: Array<any>){ this._struct = nStruct; }

  public get length(): number { return this._length; }

  public set length(nLength: number){ this._length = nLength; }

  public get front(): any { return this._front; }

  public set front(nFront: any){ this._front = nFront; }

  public get back(): any { return this._back; }

  public set back(nBack: any){ this._back = nBack; }
}

export default LinearStruct;

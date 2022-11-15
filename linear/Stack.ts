import DataStruct from '../DataStruct';

class Stack extends DataStruct {
  private _top: any;

  constructor(){
    super();
    this._top = super.front;
  }

  public push(newItem: any): void {
    this.struct.push(newItem);
    this._top = this.struct[this.length];
    this.length += 1;
  }

  public pop(): any {
    this.length -= 1;
    this._top = this.struct[this.length - 1];
    return this.struct.pop();
  }

  public peek(): any { return this._top; }
}

import LinearStruct from './LinearStruct';

class Item {
  private _key: string;
  private _value: any;

  constructor(k: string, v: any){
    this._key = k;
    this._value = v;
  }

  public get key(): string { return this._key; }

  public set key(nKey: string){ this._key = nKey; }

  public get value(): any { return this._value; }

  public set value(nValue: any){ this._value = nValue; }
}

class MapStruct extends LinearStruct {
  constructor(){
    super();
  }

  public insert(it: Item): void {
    if(this.search(it.key) && !super.isFull()){
      super.struct.push(it);
      super.length += 1;
    }
  }

  public replace(oldKey: string, newItem: Item): void {
    if(this.search(oldKey)){
      const itemIndex = this.getIndex(oldKey);
      super.struct.splice(itemIndex, 1, newItem);
    }
  }

  public updateValue(key: string, newValue: any): void {
    if(this.search(key)){
      const itemIndex = this.getIndex(key);
      super.struct[itemIndex].value = newValue;
    }
  }

  public remove(key: string): void {
    if(this.search(key) && !super.isEmpty()){
      super.struct.splice(this.getIndex(key), 1);
      super.length -= 1;
    }
  }

  public clear(): void {
    if(!super.isEmpty()){
      super.struct = [];
    }
  }

  public search(key: string): Item {
    return super.struct.find((it: Item) => it.key === key);
  }

  public getIndex(key: string): number { 
    return super.struct.findIndex((it: Item) => it.key === key);
  }
}

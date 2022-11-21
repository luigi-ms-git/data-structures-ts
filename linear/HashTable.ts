import LinearStruct from './LinearStruct';

class HashTableItem {
  private _key: string;
  public value: any;

  constructor(key: string, value?: any){
    this.value = value;
    this._key = key;
  }

  public get key(): string { return this._key; }
}

class HashTable extends LinearStruct {
  private _keys: Array<string>;
  private _values: Array<any>;

  constructor(){
    super();
    this._keys = [];
    this._values = [];
  }

  public add(key: string, value: any): void {
    if(!this.keyExists(key)){
      const index: number = this.hashData(key);
      this.keys.push(key);
      this.values.push(value);
      super.struct[index] = new HashTableItem(key, value);

      super.length += 1;
    }
  }

  public getItem(key: string): HashTableItem {
    return (this.keyExists(key))
      ? super.struct[this.hashData(key)]
      : new HashTableItem("");
  }

  public remove(key: string): void {}

  private hashData(key: string): number {
    const conv: any = {
      'a': 1, 'b':2, 'c':3, 'd':4, 'e':5,
      'f':6, 'g':7, 'h':8, 'i':9, 'j':10,
      'k':11, 'l':12, 'm':13, 'n':14, 'o':15,
      'p':16, 'q':17, 'r':18, 's':19, 't':20,
      'u':21, 'v':22, 'w':23, 'x':24, 'y': 25, 'z':26
    };
    let keySum: number = 0;
    
    Array.from(key.substr(0, 3)).forEach((l: string) => {
      keySum += conv[l];
    });
    console.log(Math.floor(10 * (keySum * 0.3141 % 1)));
    return Math.floor(10 * (keySum * 0.3141 % 1));
  }

  private keyExists(key: string): boolean {
    return this._keys.includes(key);
  }

  public get keys(): Array<string> { return this._keys; }

  public get values(): Array<any> { return this._values; }
}

const ht = new HashTable();

ht.add("name", "luigi");
ht.add("age", 22);
ht.add("issingle", true);

console.log(ht.struct[1]);

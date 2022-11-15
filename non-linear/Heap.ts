import DataStruct from '../DataStruct';

class Node {
  private _key: number;
  private _data: any;
  private _isLeaf: boolean;
  private _parentKey: number;

  constructor(data: any){
    this._key = 0;
    this._data = data;
    this._isLeaf = true;
    this._parentKey = 0;
  }

  public getNode(): string { 
    return `{ key: ${this.key}, data: ${this.data} }`;
  }

  public get key(): number { return this._key; }

  public set key(nKey: number){ this._key = nKey; }

  public get data(): any { return this._data; }

  public set data(nData: any){ this._data = nData; }

  public get isLeaf(): boolean { return this._isLeaf; }

  public set isLeaf(nIsLeaf: boolean){ this._isLeaf = nIsLeaf; };

  public get parentKey(): number { return this._parentKey; }

  public set parentKey(nParentKey: number){ this._parentKey = nParentKey; }
}

class Heap {
  private _root: Node;
  private _height: number;
  private _struct: Array<Node>;

  constructor(maxValue: number, rootData: any){
    this._root = new Node(rootData);
    this._root.key = maxValue;
    this._height = 0;
    this._struct = [this._root];
  }

  public insert(data: any, key: number): void {
    if(key < this.root.key){
      const newNode = new Node(data);
      newNode.key = key;

      if(newNode.key < this.struct[this.struct.length - 1].key){
        newNode.parentKey = this.struct[this.struct.length - 2].key;
        this.struct.splice(this.struct.length - 1, 0, newNode);
      }else{
        newNode.parentKey = this.struct[this.struct.length - 1].key;
        this.struct.push(newNode);
      }

      this.struct[this.struct.length - 1].isLeaf = false;
    }
  }

  public getAll(): Array<string> {
    return this.struct.map(n => n.getNode());
  }

  public get root(): Node { return this._root; }

  public get height(): number { return this._height; }

  public set height(nHeight: number){ this._height = nHeight; }

  public get struct(): Array<Node> { return this._struct; }

  public set struct(nStruct: Array<Node>){ this._struct = nStruct; }
}

const h = new Heap(8, "root");

console.log(h.getAll());
h.insert("hello", 7);

console.log(h.getAll());
h.insert("ola", 6);

console.log(h.getAll());
h.insert("hallo", 5);

console.log(h.getAll());


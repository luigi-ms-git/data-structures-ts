import DataStruct from '../DataStruct';

class Node {
  private _key: number;
  private _data: any;
  private _isLeaf: boolean;
  private _parentKey: number;
  private _left: Node | null;
  private _right: Node | null;

  constructor(data: any){
    this._key = 0;
    this._data = data;
    this._isLeaf = true;
    this._parentKey = 0;
    this._left = null;
    this._right = null;
  }

  public getData(): string { 
    return `{ key: ${this.key}, data: ${this.data}, isLeaf: ${this.isLeaf}, children: ${[this.left?.getData(), this.right?.getData()]} }`;
  }

  public get key(): number { return this._key; }

  public set key(nKey: number){ this._key = nKey; }

  public get data(): any { return this._data; }

  public set data(nData: any){ this._data = nData; }

  public get isLeaf(): boolean { return this._isLeaf; }

  public set isLeaf(nIsLeaf: boolean){ this._isLeaf = nIsLeaf; }

  public get parentKey(): number { return this._parentKey; }

  public set parentKey(nParentKey: number){ this._parentKey = nParentKey; }

  public get left(): Node | null { return this._left; }

  public set left(nLeft: Node | null){ this._left = nLeft; }

  public get right(): Node | null { return this._right; }

  public set right(nRight: Node | null){ this._right = nRight; }
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

  public insert(data: any, key: number, parentKey?: number): void {
    if(key < this.root.key){
      const newNode = new Node(data);
      newNode.key = key;

      if(parentKey && this.nodeExists(parentKey)){
        const p = this.getNode(parentKey);
        newNode.parentKey = parentKey;
 
        if(newNode.key % 2 === 0) p.left = newNode;
        else p.right = newNode;
        
        p.isLeaf = false;
        this.struct[this.getNodeIndex(parentKey)] = p;
      }else if(parentKey === undefined){
        newNode.parentKey = this.root.key;
        
        if(newNode.key % 2 === 0) this.root.left = newNode;
        else this.root.right = newNode;
        this.root.isLeaf = false;
      } 
      
      this.struct.push(newNode);
    }
  }

  public getAll(): Array<string> {
    return this.struct.map(n => n.getData());
  }

  public getNode(key: number): Node {
    const found = this.struct.find(n => n.key === key);
    return (found !== undefined) ? found : new Node(null); 
  }

  public getNodeIndex(key: number): number {
    const index = this.struct.findIndex(n => n.key === key);
    return (index !== undefined) ? index : 0; 
  }

  public nodeExists(key: number): boolean {
    return (this.getNode(key).data !== null);
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
h.insert("hallo", 5, 7);

console.log(h.getAll());
h.insert("hola", 4, 7);

console.log(h.getAll());


class HeapNode {
  private _key: number;
  private _data: any;
  private _parentKey: number;
  private _children: Array<HeapNode>;
  public _MAX_CHILDREN: number;

  constructor(data: any){
    this._key = 0;
    this._data = data;
    this._parentKey = 0;
    this._children = [];
    this._MAX_CHILDREN = 2;
  }

  public getData(): string { 
    return `{ key: ${this.key}, data: ${this.data}, ${this.isLeaf ? `isLeaf: true` : `children: ${this.children}`} }`;
  }

  public get key(): number { return this._key; }

  public set key(nKey: number){ this._key = nKey; }

  public get data(): any { return this._data; }

  public get parentKey(): number { return this._parentKey; }

  public set parentKey(nParentKey: number){ this._parentKey = nParentKey; }

  public get children(): Array<HeapNode> { return this._children; }

  public get MAX_CHILDREN(): number { return this._MAX_CHILDREN; }

  public get isLeaf(): boolean { return this.children.length > 0; }

  public get hasMaxChildren(): boolean { return this.children.length == this.MAX_CHILDREN; }
}

class Heap {
  private _root: HeapNode;
  private _struct: Array<HeapNode>;

  constructor(maxValue: number){
    this._root = new HeapNode("ROOT");
    this._root.key = maxValue;
    this._struct = [this._root];
  }

  public insert(data: any, key: number, parentKey?: number): void {
    if(key < this._root.key){
      const newNode = new HeapNode(data);
      newNode.key = key;

      if(parentKey && this.nodeExists(parentKey)){
        const p = this.getNode(parentKey);
        newNode.parentKey = parentKey;
 
        if(!p.hasMaxChildren){
          p.children.push(newNode);
          this._struct[this.getNodeIndex(parentKey)] = p; 
          this._struct.push(newNode);
        }
      }else if(!this._root.hasMaxChildren){
        newNode.parentKey = this._root.key;
        
        this._root.children.push(newNode); 
        this._struct.push(newNode);
      }
    }
  }

  public remove(key: number, parentKey?: number): void {
    if(this.nodeExists(key) && this._root.key !== key){
      const node = this.getNode(key),
          nodeIndex = this.getNodeIndex(key);

      if(!node.isLeaf){
        //Remove children from struct and 
        //remove node from both struct and parent
      }else if(parentKey){
        const parentNode = this.getNode(parentKey);

        parentNode.children.splice(nodeIndex, 1);
        this._struct.splice(nodeIndex, 1);
        this._struct.splice(parentKey, 1, parentNode);
      }else{
        const rootChildIndex = this._root.children.findIndex(n => n.key === nodeIndex);

        this._struct.splice(nodeIndex, 1);
        this._root.children.splice(rootChildIndex, 1);
      }
    }
  }

  public getNode(key: number): HeapNode {
    const found = this._struct.find(n => n.key === key);
    return (found !== undefined) ? found : new HeapNode(null); 
  }

  private getNodeIndex(key: number): number {
    const index = this._struct.findIndex(n => n.key === key);
    return (index !== undefined) ? index : 0; 
  }

  private nodeExists(key: number): boolean {
    return (this.getNode(key).data !== null);
  }

  public get nodes(): Array<string> { 
    return this._struct.map(n => n.getData());
  }
}

const h = new Heap(8);

console.log(h.nodes);
h.insert("hello", 7);

console.log(h.nodes);
h.insert("ola", 6);

console.log(h.nodes);
h.insert("hallo", 5, 7);

console.log(h.nodes);
h.insert("hola", 4, 7);

console.log(h.nodes);

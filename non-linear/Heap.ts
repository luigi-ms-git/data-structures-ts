class HeapNode {
  public key: number;
  public parentKey: number;
  private _data: any;
  private _nodes: Array<HeapNode>;
  private _MAX_CHILDREN: number;
  private _MIN_CHILDREN: number;

  constructor(data: any){
    this.key = 0;
    this.parentKey = 0;
    this._data = data;
    this._nodes = [];
    this._MAX_CHILDREN = 2;
    this._MIN_CHILDREN = 0;
  }

  public getData(): string { 
    return `{ key: ${this.key}, data: ${this.data}, ${(this.isLeaf) ? "isLeaf: true" : `nodes: ${JSON.stringify(this.nodes.map((n: HeapNode) => n.getData()))}`} }`;
  }

  public get data(): any { return this._data; }

  //the left and right nodes are kept in the nodes array
  public get nodes(): Array<HeapNode> { return this._nodes; }

  public get MAX_CHILDREN(): number { return this._MAX_CHILDREN; }

  public get hasBothNodes(): boolean { return this.nodes.length === this._MAX_CHILDREN; }

  public get isLeaf(): boolean { return this.nodes.length === this._MIN_CHILDREN; }
}

class Heap {
  private _root: HeapNode;
  private _stack: Array<HeapNode>;

  constructor(maxValue: number){
    this._root = new HeapNode("ROOT");
    this._root.key = maxValue;
    this._stack = [this._root];
  }

  //no parentKey passed means you want to add the node to Root
  public insert(data: any, key: number, parentKey?: number): void {
    if(key < this._root.key){
      const newNode = new HeapNode(data);
      newNode.key = key;

      if(parentKey && this.nodeExists(parentKey)){
        const p = this.getNode(parentKey);
        newNode.parentKey = parentKey;
 
        if(!p.hasBothNodes){
          p.nodes.push(newNode);
          this._stack[this.getNodeIndex(parentKey)] = p; 
          this._stack.push(newNode);
        }
      }else if(!this._root.hasBothNodes){
        newNode.parentKey = this._root.key;
        
        this._root.nodes.push(newNode); 
        this._stack.push(newNode);
      }
    }
  }

  //no parentKey passed means you want to remove the node from Root
  public removeLast(key: number, parentKey?: number): void {
    if(this.nodeExists(key) && this._root.key !== key){
      const node = this.getNode(key);
      let nodeIndex = this.getNodeIndex(key);

      this._stack.splice(nodeIndex, 1);

      if(parentKey){
        const parentNode = this.getNode(parentKey);
        nodeIndex = this.getNodeIndex(key, parentNode.nodes);

        parentNode.nodes.splice(nodeIndex, 1);

        this._stack[this.getNodeIndex(parentKey)] = parentNode;
      }else{
        const rootChildIndex = this._root.nodes.findIndex(n => n.key === nodeIndex);

        this._root.nodes.splice(rootChildIndex, 1);
      }
    }
  }

  public getNode(key: number): HeapNode {
    const found = this._stack.find(n => n.key === key);
    return (found !== undefined) ? found : new HeapNode(null); 
  }

  private getNodeIndex(key: number, arr?: Array<HeapNode>): number {
    const index = (arr)
      ? arr.findIndex(n => n.key === key)
      : this._stack.findIndex(n => n.key === key);

    return (index !== undefined) ? index : 0; 
  }

  private nodeExists(key: number): boolean {
    return (this.getNode(key).data !== null);
  }

  public get nodes(): Array<string> { 
    return this._stack.map(n => n.getData());
  }
}

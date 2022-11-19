class TreeNode {
  public parentKey: number;
  public data: any;
  private _key: number;
  private _left: TreeNode | null;
  private _right: TreeNode | null;

  constructor(key: number){
    this.parentKey = 0;
    this.data = "";
    this._key = key;
    this._left = null;
    this._right = null;
  }

  public addNode(node: TreeNode): void {
    if(this._left = null) this._left = node;
    else if(this._right = null) this._right = node;
  }

  public removeNode(key: number): void {
    if(this._left?.key === key) this._left = null;
    else if(this._right?.key === key) this._right = null;
  }

  public getData(): string { 
    return `{ key: ${this._key}, data: ${this.data}, ${(this.isLeaf()) ? "isLeaf: true" : `hasSubHeap: true`} }`;
  }

  public hasBothNodes(): boolean { return (this._left !== null && this._right !== null) }

  public isLeaf(): boolean { return this.hasBothNodes() === false; }

  public get key(): number { return this._key; }
}

class BinaryTree {
  private _root: TreeNode;
  private _stack: Array<TreeNode>;

  constructor(rootKey: number){
    this._root = new TreeNode(rootKey);
    this._root.data = "ROOT";
    this._stack = [this._root];
  }

  //no parentKey passed means you want to add the node to Root
  public insert(data: any, key: number, parentKey?: number): void {
    if(key < this._root.key){
      const newNode = new TreeNode(key);
      newNode.data = data;

      if(parentKey && this.nodeExists(parentKey)){
        const p = this.searchByKey(parentKey);
        newNode.parentKey = parentKey;
 
        if(!p.hasBothNodes()){
          p.addNode(newNode);
          this._stack[this.getNodeIndex(parentKey)] = p; 
          this._stack.push(newNode);
        }
      }else if(!this._root.hasBothNodes()){
        newNode.parentKey = this._root.key;
        
        this._root.addNode(newNode);
        this._stack.push(newNode);
      }
    }
  }

  //no parentKey passed means you want to remove the node from Root
  public removeLast(key: number, parentKey?: number): void {
    if(this.nodeExists(key) && this._root.key !== key){
      const nodeIndex = this.getNodeIndex(key);

      this._stack.splice(nodeIndex, 1);

      if(parentKey){
        const parentNode = this.searchByKey(parentKey);

        parentNode.removeNode(key);
        this._stack[this.getNodeIndex(parentKey)] = parentNode;
      }else{
        this._root.removeNode(key);
      }
    }
  }

  public searchByKey(key: number): TreeNode {
    return this._stack.find(n => n.key === key) ?? new TreeNode(NaN);
  }

  public searchByData(data: any): TreeNode {
    return this._stack.find(n => n.data === data) ?? new TreeNode(NaN);
  }

  private getNodeIndex(key: number): number {
    return this._stack.findIndex(n => n.key === key) ?? 0;
  }

  private nodeExists(key: number): boolean {
    return this.searchByKey(key).key !== NaN;
  }

  public getAllNodes(): Array<string> { 
    return this._stack.map(n => n.getData());
  }

  public getTreeHeight(): number { return this._stack.length; }
}

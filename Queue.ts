import DataStruct from './DataStruct';

class Queue extends DataStruct {
  constructor(){
    super();
  }

  public enqueue(newItem: any): void {
    if(this.length + 1 <= this.MAX_LENGTH){
      this.length = this.struct.unshift(newItem);
      this.front = this.struct[0];
      this.back = this.struct[this.length - 1];
    }
  }

  public dequeue(): any {
    if(this.length >= 1){
      this.length -= 1;
      this.front = this.struct[1];
      return this.struct.shift();
    }
  }
  public getFront(): any { return this.front; }

  public getRear(): any { return this.back; }
}

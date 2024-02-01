
export class Identifier<T> {
    constructor(private value: T) {
      this.value = value;
    }
  
    equals (id?: Identifier<T>): boolean {

      const isNullOrUndefined = [null, undefined].includes(id);
      const isInstanceOfIdentifierClass = id instanceof this.constructor;

      if (isNullOrUndefined || !isInstanceOfIdentifierClass) {
        return false;
      }
  
      return id.toValue() === this.value;
    }
  
    toString () {
      return String(this.value);
    }
  
    toValue (): T {
      return this.value;
    }
  }
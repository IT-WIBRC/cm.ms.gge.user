import { UniqueEntityID } from './UniqueEntityID';

const isEntity = (e: any): e is Entity<any> => {
  return e instanceof Entity;
};

export abstract class Entity<T> {
  protected readonly _id: UniqueEntityID;
  public readonly props: T;

  constructor (props: T, id?: UniqueEntityID) {
    this._id = id ? id : new UniqueEntityID();
    this.props = props;
  }

  public equals (object?: Entity<T>) : boolean {

    const isNullOrUndefined = [null, undefined].includes(object);

    if (isNullOrUndefined || !isEntity(object)) {
      return false;
    }

    if (this === object) {
      return true;
    }

    return this._id.equals(object._id);
  }
}
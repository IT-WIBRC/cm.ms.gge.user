
import { User } from "../domain/user";
import { UserMap } from "../mappers/UserMap";
import { UserEmail } from "../domain/ValueObjects/userEmail";
import { Repository } from "typeorm";

export interface IUserRepo {
  findUserByEmail(email: UserEmail): Promise<User>;
  findUserByUsername (username: string): Promise<User>;
  exists (email: UserEmail): Promise<boolean>;
  save(user: User): Promise<void>;
}

export class UserRepo implements IUserRepo {
  private model: Repository<any>;

  constructor (model: Repository<any>) {
    this.model = model;
  }

  private createBaseQuery () {
    return {
      where: {},
    }
  }

  public async findUserByUsername (username: string): Promise<User> {
    const baseQuery = this.createBaseQuery();
    baseQuery.where['username'] = username;
    const user = await this.model.findOne(baseQuery);
    if (!!user === true) return user;
    return null;
  }

  public async findUserByEmail(email: UserEmail): Promise<User> {
    const baseQuery = this.createBaseQuery();
    baseQuery.where['email'] = email.value.toString();
    const user = await this.model.findOne(baseQuery);
    if (!!user === true) return user;
    return null;
  }

  public async exists (email: UserEmail): Promise<boolean> {
    const baseQuery = this.createBaseQuery();
    baseQuery.where['email'] = email.value.toString();
    const user = await this.model.findOne(baseQuery);
    return !!user === true;
  }

  public async save (user: User): Promise<void> {
    const UserModel = this.model;
    const exists = await this.exists(user.email);
    const rawUser = UserMap.toPersistence(user);
    
    try {
      if (!exists) {
        // Create new
        await UserModel.create(rawUser);
      } 
      
      else {
        // Save old
        const TypeOrmUserInstance = await UserModel.findOne({ 
          where: { email: user.email.value }
        })
        await TypeOrmUserInstance.update(rawUser);
      }
    } catch (err) {
      console.log(err);
    }
  }
}
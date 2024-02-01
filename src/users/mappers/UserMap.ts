
import { Mapper } from "../../core/infra/Mapper";
import { User } from "../domain/user";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { UserEmail } from "../domain/ValueObjects/userEmail";
import { UserPassword } from "../domain/ValueObjects/userPassword";

export class UserMap extends Mapper<User> {

  public static toPersistence (user: User): any {
    return {
      base_user_id: user.id.toString(),
      user_email: user.email.value,
      user_password: user.password.value,
      first_name: user.firstName,
      last_name: user.lastName,
      is_actived: user.isActive,
      username: user.username
    }
  }

  public static toDomain (raw: any): User {
    const userEmailOrError = UserEmail.create(raw.user_email);
    const userPasswordOrError = UserPassword.create(raw.user_password);

    const userOrError = User.create({
      email: userEmailOrError.getValue(),
      password: userPasswordOrError.getValue(),
      firstName: raw.first_name,
      lastName: raw.last_name,
      isActived: raw.is_actived,
      username: raw.username,
      createdAt: raw.created_at
    }, new UniqueEntityID(raw.base_user_id))

    userOrError.isFailure ? console.log(userOrError.error) : '';
    
    return userOrError.isSuccess ? userOrError.getValue() : null;
  }
  
}
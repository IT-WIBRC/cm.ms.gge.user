import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { UserId } from "./ValueObjects/userId";
import { ProfilePictureId } from "./ValueObjects/profilePictureId";
import { UserEmail } from "./ValueObjects/userEmail";
import { Guard, GuardArgumentCollection } from "../../core/logic/Guard";
import { UserCreatedEvent } from "./events/userCreatedEvent";
import { UserPassword } from "./ValueObjects/userPassword";


interface UserProps {
  lastName: string;
  password: UserPassword;
  firstName: string;
  email: UserEmail;
  createdAt: string;
  isActived: boolean;
  username?: string;
  profilePictureId?: ProfilePictureId;
  description?: string;
  googleId?: number;
}

export class User extends AggregateRoot<UserProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get userId (): UserId {
    return UserId.caller(this.id)
  }

  get email (): UserEmail {
    return this.props.email;
  }

  get firstName (): string {
    return this.props.firstName
  }

  get lastName (): string {
    return this.props.lastName;
  }

  get username (): string {
    return this.props.username;
  }

  set username (value: string) {
    this.props.username = value;
  }

  get password (): UserPassword {
    return this.props.password;
  }

  get isActive (): boolean {
    return this.props.isActived;
  }

  get createdAt (): string {
    return this.props.createdAt;
  }

  get profilePictureId (): ProfilePictureId {
    return this.props.profilePictureId;
  }

  get googleId (): number {
    return this.props.googleId;
  }

  get description (): string {
    return this.props.description;
  }

  private constructor (props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  private static isRegisteringWithGoogle (props: UserProps): boolean {
    return !!props.googleId === true;
  }

  public static create (props: UserProps, id?: UniqueEntityID): Result<User> {

    const guardedProps: GuardArgumentCollection = [
      { argument: props.firstName, argumentName: 'firstName' },
      { argument: props.lastName, argumentName: 'lastName' },
      { argument: props.email, argumentName: 'email' },
      { argument: props.createdAt, argumentName: 'createdAt' },
      { argument: props.isActived, argumentName: 'isEmailVerified' }
    ];

    if (!this.isRegisteringWithGoogle(props)) {
      guardedProps.push({ argument: props.password, argumentName: 'password' })
    }

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<User>(guardResult.message)
    } 
    
    else {
      const user = new User({
        ...props,
        username: props.username ? props.username : '',
        description: props.description ? props.description : '',
      }, id);

      const idWasProvided = !!id;

      if (!idWasProvided) {
        user.addDomainEvent(new UserCreatedEvent(user));
      }

      return Result.ok<User>(user);
    }
  }
}
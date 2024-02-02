import { ValueObject } from "../../../core/domain/ValueObject";
import { Guard } from "../../../core/logic/Guard";
import { Result } from "../../../core/logic/Result";

interface UserUsernameProps {
    value: string;
}

export class UserUsername extends ValueObject<UserUsernameProps> {
    get value (): string {
        return this.props.value;
    }

    private constructor (props: UserUsernameProps) {
        super(props);
    }

    public static create (username: string): Result<UserUsername> {
        const guardResult = Guard.againstNullOrUndefined(username, 'username');

        if (!guardResult.succeeded) {
          return Result.fail<UserUsername>(guardResult.message);
        } else {

          const wellFormedUsername = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(username);
          if (!wellFormedUsername) {
            return Result.fail<UserUsername>("username is ill-formed");
          }
          
          return Result.ok<UserUsername>(new UserUsername({ value: username }));;
        }
      }
}
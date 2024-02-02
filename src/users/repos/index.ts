import { UserRepo, IUserRepo } from "./userRepo";
import { typeOrmModelRepositories } from "../../infra/typeorm/models";

const { User: TypeOrmUserRepository} = typeOrmModelRepositories;
const userRepo = new UserRepo(TypeOrmUserRepository);

export { userRepo, IUserRepo }
import { UserRepo, IUserRepo } from "./userRepo";
import { modelsAsObject } from "../../infra/typeorm/models";

const { User } = modelsAsObject;
const userRepo = new UserRepo(User);

export { userRepo, IUserRepo }
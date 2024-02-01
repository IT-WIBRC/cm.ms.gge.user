
import { UserRepo, IUserRepo } from "./userRepo";
import { models } from "../../infra/typeorm/models";

const userRepo = new UserRepo(models);

export { userRepo, IUserRepo }
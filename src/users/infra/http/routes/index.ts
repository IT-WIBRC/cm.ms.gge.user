
import express from 'express';
import { createUserController } from '../../../useCases/createUser';

const userRouter = express.Router();

userRouter.post('/',
  (request, response) => createUserController.execute(request, response)
)

export { userRouter };
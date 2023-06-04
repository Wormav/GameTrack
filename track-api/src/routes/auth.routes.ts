import { Router } from 'express'
import { deleteUser, signin, signout, signup } from '../controllers/auth.controllers'
import { verifyJwt } from '../middlewares/verifyJwt';

const authRouter = Router();

authRouter.put('/signup', signup)

authRouter.post('/signin', signin)

authRouter.delete("/", signout);

authRouter.delete('/delete', verifyJwt, deleteUser)

export default authRouter;

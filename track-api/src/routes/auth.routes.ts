import { Router } from 'express'
import { deleteUser, getUser, signin, signout, signup } from '../controllers/auth.controllers'
import { verifyJwt } from '../middlewares/verifyJwt';

const authRouter = Router();

authRouter.put('/signup', signup)

authRouter.post('/signin', signin)

authRouter.get('/',verifyJwt, getUser)

authRouter.delete("/", verifyJwt,signout);

authRouter.delete('/delete', verifyJwt, deleteUser)

export default authRouter;

import { Router } from 'express'
import { deleteUser, getUser, signin, signout, signup } from '../controllers/auth.controllers'
import { addUserInRequest, verifyJwt } from '../middlewares/passport';

const authRouter = Router();

authRouter.put('/signup', (req, res) => {
  void signup(req, res)
})

authRouter.post('/signin', signin)

authRouter.get('/', addUserInRequest, (req, res) => {
  void getUser(req, res)
})

authRouter.delete("/", verifyJwt, signout);

authRouter.delete('/delete', addUserInRequest, (req, res) => {
  void deleteUser(req, res)
})

export default authRouter;

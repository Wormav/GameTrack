import { Router } from 'express'
import { deleteUser, signin, signup } from '../controllers/auth.controllers'

const authRouter = Router()


authRouter.put('/signup', signup)

authRouter.post('/signin', signin)

authRouter.delete('/delete', deleteUser)

export default authRouter;

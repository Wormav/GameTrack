import { Router } from 'express'
import { signin, signup } from '../controllers/auth.controllers'

const authRouter = Router()


authRouter.put('/signup', signup)

authRouter.post('/signin', signin)


export default authRouter;

import { Router } from 'express'
import { signin, signup } from '../controllers/auth.controllers'

const authRouter = Router()


authRouter.put('/signup', signup)

authRouter.post('/signin',  signin)

authRouter.put('/jwt', (req,res) => {

    res.json("jwt")
})

export default authRouter;
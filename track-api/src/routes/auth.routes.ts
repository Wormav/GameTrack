import { Request, Response, Router } from 'express'
import { signin, signup } from '../controllers/auth.controllers'
import passport from 'passport'
import { verifyJwt } from '../middlewares/verifyJwt'

const authRouter = Router()


authRouter.put('/signup', signup)

authRouter.post('/signin', signin)


authRouter.get('/test', verifyJwt, function(req: Request, res: Response)  {
    console.log("ANSDJIASNJDK")
    res.json({"bite": "bite1"})
})

export default authRouter;

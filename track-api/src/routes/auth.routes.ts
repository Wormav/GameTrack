import { Router } from 'express'
import { signin, signout, signup } from '../controllers/auth.controllers'

const authRouter = Router();

authRouter.put("/signup", signup);

authRouter.post("/signin", signin);

authRouter.delete("/", signout);


export default authRouter;
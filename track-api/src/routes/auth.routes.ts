import e, { Request, Response, Router } from 'express'
import { signin, signup } from '../controllers/auth.controllers'
import passport from 'passport'
import { verifyJwt } from '../middlewares/verifyJwt'
import { IgdbClient } from '../queries/igdb_client'

const authRouter = Router()


authRouter.put('/signup', signup)

authRouter.post('/signin', signin)


authRouter.get('/test', verifyJwt, async function(req: Request, res: Response)  {
    const t = new IgdbClient("tdnlxi522gvfz6cznr513xckz77r5i", "5usmwsu4bj8qlfscyunjl69rihwuwe")
    console.log(await t.get_access_token())
    res.json({"testJwt": "testJwt"})
})


export default authRouter;

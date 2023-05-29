import { Router } from 'express'
import { getGame } from '../controllers/games.controllers';

const gamesRouter = Router();

gamesRouter.get('/', getGame)

export default gamesRouter;
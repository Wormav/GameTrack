import { Router } from 'express'
import { getGames, getOneGame } from '../controllers/games.controllers';

const gamesRouter = Router();

gamesRouter.get('/', getGames)
gamesRouter.get('/:id', getOneGame)

export default gamesRouter;
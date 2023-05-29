import { Router } from 'express'
import { addGameInUserGames, deleteGameInUserGames, getAllUserGames, getGames, getOneGame } from '../controllers/games.controllers';

const gamesRouter = Router();

gamesRouter.get('/games', getGames)
gamesRouter.get('/game/:id', getOneGame)
gamesRouter.get('/usergames', getAllUserGames)
gamesRouter.post('/addgame', addGameInUserGames)
gamesRouter.delete('/deletegame', deleteGameInUserGames)

export default gamesRouter;
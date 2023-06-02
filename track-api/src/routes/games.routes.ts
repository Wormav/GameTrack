import { Router } from 'express'
import { addGameInUserGames, deleteGameInUserGames,
getAllUserGames, getGames, getOneGame } from '../controllers/games.controllers';
import { verifyJwt } from '../middlewares/verifyJwt';

const gamesRouter = Router();

gamesRouter.get('/games', getGames)
gamesRouter.get('/game/:id',verifyJwt, getOneGame)
gamesRouter.get('/usergames',verifyJwt, getAllUserGames)
gamesRouter.post('/addgame',verifyJwt, addGameInUserGames)
gamesRouter.delete('/deletegame',verifyJwt, deleteGameInUserGames)

export default gamesRouter;
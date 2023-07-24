import { Router } from "express";
import {
  getGames,
  getOneGame,
} from "../controllers/games.controllers";
import {  verifyJwt } from "../middlewares/passport";

const gamesRouter = Router();

gamesRouter.get("/", verifyJwt, (req, res) => {
  void getGames(req, res);
});
gamesRouter.get("/game/:id", verifyJwt, (req, res) => {
  void getOneGame(req, res);
});

export default gamesRouter;

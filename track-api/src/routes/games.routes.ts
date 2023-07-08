import { Router } from "express";
import {
  addGameInUserGames,
  deleteGameInUserGames,
  getAllUserGames,
  getGames,
  getOneGame,
} from "../controllers/games.controllers";
import { verifyJwt } from "../middlewares/verifyJwt";

const gamesRouter = Router();

gamesRouter.get("/games", verifyJwt, (req, res) => {
  void getGames(req, res);
});
gamesRouter.get("/game/:id", verifyJwt, (req, res) => {
  void getOneGame(req, res);
});
gamesRouter.get("/usergames", verifyJwt, getAllUserGames);
gamesRouter.post("/addgame", verifyJwt, addGameInUserGames);
gamesRouter.delete("/deletegame", verifyJwt, deleteGameInUserGames);

export default gamesRouter;

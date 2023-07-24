import { Router } from "express";
import {
  addGameInUserGames,
  deleteGameInUserGames,
  getAllUserGames,
  getGames,
  getOneGame,
} from "../controllers/games.controllers";
import { addUserInRequest, verifyJwt } from "../middlewares/passport";

const gamesRouter = Router();

gamesRouter.get("/games", verifyJwt, (req, res) => {
  void getGames(req, res);
});
gamesRouter.get("/game/:id", verifyJwt, (req, res) => {
  void getOneGame(req, res);
});
gamesRouter.get("/usergames", addUserInRequest, (req, res) => {
  void getAllUserGames(req, res);
});
gamesRouter.post("/addgame", addUserInRequest, (req, res) => {
  void addGameInUserGames(req, res)
});
gamesRouter.delete("/deletegame", addUserInRequest, (req, res) => {
  void deleteGameInUserGames(req, res)
});

export default gamesRouter;

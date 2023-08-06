import { Router } from "express";

import { addUserInRequest } from "../middlewares/passport";
import { addGameInUserGames, deleteGameInUserGames, getAllUserGames, updateUserGameTime } from "../controllers/user.controllers";

const userRouter = Router();

userRouter.get("/games", addUserInRequest, (req, res) => {
  void getAllUserGames(req, res);
});

userRouter.post("/game", addUserInRequest, (req, res) => {
  void addGameInUserGames(req, res)
});

userRouter.delete("/game", addUserInRequest, (req, res) => {
  void deleteGameInUserGames(req, res)
});

userRouter.post('/game/:id/time', addUserInRequest, (req, res) => {
  void updateUserGameTime(req, res)
})
    

export default userRouter;

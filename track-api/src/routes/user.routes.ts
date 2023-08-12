import { Router } from "express";
import { addUserInRequest } from "../middlewares/passport";
import { addGameInUserGames, deleteGameInUserGames, deleteUserProfile, getAllUserGames, getUserAvatar, updateUserGameTime, updateUserProfile } from "../controllers/user.controllers";
import { uploadSingleFile } from "../middlewares/multer";

const userRouter = Router();

userRouter.post('/', addUserInRequest, uploadSingleFile('tmp', 'avatar'), (req, res) => {
  void updateUserProfile(req, res);
});

userRouter.delete('/', addUserInRequest, (req, res) => {
  void deleteUserProfile(req, res);
})

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

userRouter.get("/avatar", addUserInRequest, (req, res) => {
  void getUserAvatar(req, res)
});

export default userRouter;

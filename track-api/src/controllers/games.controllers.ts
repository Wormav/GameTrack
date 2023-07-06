import { Request, Response } from "express";
import {  createUserGames, deleteUserGames, getGamesInDb, getOneGameInDb, getUserGames } from "../database/clients/games.client";
import passport from "passport";
import { User } from "@prisma/client";

export async function getGames(req: Request, res: Response) {
  const gameName  = req.query.gameName
  const offset = req.query.offset
  if (!gameName || !offset) return res.status(400).json(
    { error: 'Missing parameters' }
  )
  const result = await getGamesInDb(gameName as string, parseInt(offset as string))
  if(!result) return res.status(400).json()

  return res.status(200).json(result)
}

export async function getOneGame(req: Request, res: Response){
   const id: number = parseInt(req.params.id)
   const result = await getOneGameInDb(id)
   if(!result) return res.status(400).json()

   return res.status(200).json(result)
}

export async function getAllUserGames(req: Request,res: Response){
  passport.authenticate('jwt', {session: false}, async (error: string, user: User, r: {message: string}) => {
    if(!user){
      const {message} = r
      return res.status(401).json({error: message ?? error})
    }
    const id = user.id

    const result = await getUserGames(id)

    if(!result) {
      return res.status(400).json({error: 'Failed get userGames'})
    }

    return res.status(200).json(result)
  })(req, res);
 }

export async function addGameInUserGames(req: Request, res: Response) {
  passport.authenticate('jwt', { session: false }, async (error: string, user: User, r: { message: string }) => {
    if (!user){
        const { message } = r
        return res.status(401).json({ error: message ?? error });
      }

    const userId: number = user.id; 
    const gameId: number = req.body.gameId;

    const result = await createUserGames(userId, gameId);

    if (!result) {
      return res.status(400).json({ error: 'Failed to add game to user' });
    }

    return res.status(200).json(result);
  })(req, res);
}


export async function deleteGameInUserGames(req: Request, res: Response) {
  passport.authenticate('jwt', { session: false }, async (error: string, user: User, r: { message: string }) => {
    if (!user) {
      const { message } = r;
      return res.status(401).json({ error: message ?? error });
      
    }
    const userId: number = user.id;
    const gameId: number = req.body;


    const result = await deleteUserGames(userId, gameId);

    if (!result) {
      return res.status(400).json({ error: 'Failed to delete game from user' });
    }

    return res.status(200).json(result);
  })(req, res);
}

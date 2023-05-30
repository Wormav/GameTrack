import { Request, Response } from "express";
import {  createUserGames, deleteUserGames, getGamesInDb, getOneGameInDb, getUserGames } from "../database/clients/games.client";

export async function getGames(req: Request, res: Response) {
   const gameName : string = req.body.gameName
   const offset : number = req.body.offset
   const result = await getGamesInDb(gameName, offset)

   if(result && result.length === 0) return res.status(400).json()

   return res.status(200).json(result)
}

export async function getOneGame(req: Request, res: Response){
   const id : number = parseInt(req.params.id)
   const result = await getOneGameInDb(id)

   if(!result) return res.status(400).json()

   return res.status(200).json(result)
}

export async function getAllUserGames(req: Request, res: Response){
   const id : number = req.body.id

   const result = await getUserGames(id)

   if(result  && result.length === 0) return res.status(400).json()

   return res.status(200).json(result)
}

export async function addGameInUserGames(req: Request, res: Response){
   const userId : number = req.body.userId
   const gameId : number = req.body.gameId

   const result = await createUserGames(userId, gameId)

   if(!result) return res.status(400).json()

   return res.status(200).json(result)
}

export async function deleteGameInUserGames(req : Request, res: Response){
   const userId : number = req.body.userId
   const gameId : number = req.body.gameId

   const result = await deleteUserGames(userId, gameId)

   if(!result) return res.status(400).json()

   return res.status(200).json(result)
}
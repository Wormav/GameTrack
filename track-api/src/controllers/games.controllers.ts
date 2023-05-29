import { Request, Response } from "express";
import { getGamesInDb, getOneGameInDb } from "../database/clients/games.client";

export async function getGames(req: Request, res: Response) {
   const gameName : string = req.body.gameName
   const result = await getGamesInDb(gameName, 0)

   if(result && result.length === 0) return res.status(400).json()

   return res.status(200).json(result)
}

export async function getOneGame(req: Request, res: Response){
   const id : number = parseInt(req.params.id)
   const result = await getOneGameInDb(id)

   if(!result) return res.status(400).json()

   return res.status(200).json(result)
}
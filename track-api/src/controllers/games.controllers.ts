import { Request, Response } from "express";
import { getGamesInDb } from "../database/client";

export async function getGame(req: Request, res: Response) {
   const gameName : string = req.body.gameName
   const result = await getGamesInDb(gameName)

   if(result && result.length === 0) return res.status(400).json()

   return res.status(200).json(result)
}
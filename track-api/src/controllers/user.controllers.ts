import { Request, Response } from "express"
import { addUserInDb } from "../database/client"


export async function createUser(req: Request, res: Response){
    try {
        const user = await addUserInDb({
            email: "dimitri@gmail.com",
            username: "dimitri",
            password:"123123",
          })

          return user
    }
    catch(error) {
        return "toto"
    }
}
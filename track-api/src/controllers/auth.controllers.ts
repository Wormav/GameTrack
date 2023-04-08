import { Request, Response } from "express";
import { addUserInDb } from "../database/client";
import bcrypt from 'bcrypt';
import { User } from "@prisma/client";
import passport from "passport";
import jwt from 'jsonwebtoken';

export async function  signup(req: Request, res: Response){
    const { email, password, pseudo }: {email: string, password: string, pseudo: string} = req.body


    if(!email || !password || !pseudo)
        return res.status(400).json()

    const hashedPassword = await bcrypt.hash(password, 10)

    const userObject = await addUserInDb({
        email: email.trim(),
        username: pseudo.trim(),
        password:hashedPassword,
      })

    if (!userObject.status)
      return res.status(409).json(userObject.error)
    return res.status(200).json()
}

export async function signin(req: Request, res: Response){
  passport.authenticate(  'local',
  {session: false},
  (error: string, user: User, r: {message: string}) => {
      if (error || !user) {
        const { message } = r
        return res.status(400).json({ error: message ?? error });
      }

      const payload = {
      username: user.username,
      expires: Date.now() + parseInt("86400000"),
      };
      const JWT_SECRET = process.env.JWT_SECRET ?? ""
      const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
      res.cookie('jwt', token, { httpOnly: true, secure: true });
      return res.status(200).send({ username: user.username });
  })(req, res)
}


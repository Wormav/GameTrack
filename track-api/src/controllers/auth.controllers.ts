import { Request, Response } from "express";
import { addUserInDb, deleteUserInDb } from "../database/clients/users.client";
import bcrypt from 'bcrypt';
import { User } from "@prisma/client";
import passport from "passport";
import jwt from "jsonwebtoken";

export async function signup(req: Request, res: Response) {
  const {
    email,
    password,
    pseudo,
  }: { email: string; password: string; pseudo: string } = req.body;

  if (!email || !password || !pseudo) return res.status(400).json();

  const hashedPassword = await bcrypt.hash(password, 10);

  const userObject = await addUserInDb({
    email: email.trim(),
    username: pseudo.trim(),
    password: hashedPassword,
  });

  if (!userObject.status) return res.status(409).json(userObject.error);
  return res.status(200).json();
}

export async function signin(req: Request, res: Response) {
  passport.authenticate(
    "local",
    { session: false },
    (error: string, user: User, r: { message: string }) => {
      if (error || !user) {
        const { message } = r;
        return res.status(400).json({ error: message ?? error });
      }

      const payload = {
        id: user.id,
        username: user.username,
        expires: Date.now() + parseInt("86400000"),
      };
      const JWT_SECRET = process.env.JWT_SECRET ?? "";
      const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
      res.cookie("jwt", token, { httpOnly: true, secure: true });
      return res.status(200).send({ username: user.username });
    }
  )(req, res);
}

export async function signout(req: Request, res: Response) {
  res.clearCookie("jwt");
  res.status(200).send("Déconnexion");}

  
export async function deleteUser(req: Request, res: Response){
  passport.authenticate('jwt',
    { session: false },
    async (error: string, user: User, r: { message: string }) => {
      if (!user){
        const { message } = r
        return res.status(401).json({ error: message ?? error });
      }
      const pseudo = user.username
      const userDeleted = await deleteUserInDb(pseudo)
      if (userDeleted)
        return res.status(200).send('ok')
      return res.status(400).send('error')
    })(req, res)
}

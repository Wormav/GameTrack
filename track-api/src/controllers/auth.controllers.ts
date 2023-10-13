import { Request, Response } from "express";
import { addUserInDb, deleteUserInDb, getUserWithEmail, getUserWithId, updateUser } from "../database/clients/users.client";
import bcrypt from 'bcrypt';
import { User } from "@prisma/client";
import passport from "passport";
import cookieExtractor from "../utils/request";
import { createJwtToken } from "../utils/auth";
import Mail from "../utils/mail";
import generateString from "../utils/string";

interface RequestBody {
  email: string;
  password: string;
  pseudo: string;
}

export async function signup(req: Request, res: Response) {
  const requestBody: RequestBody = req.body as RequestBody;
  const { email, password, pseudo } = requestBody;
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
export function signin(req: Request, res: Response) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  passport.authenticate(
    "local",
    { session: false },
    (error: string | null, user: User | false, r: { message: string }) => {
      if (error || !user) {
        const { message } = r;
        return res.status(400).json({ error: message ?? error });
      }
      const token = createJwtToken(user)
      const secureCookie = process.env.JWT_SECURE_COOKIE === "true"; 
      
      res.cookie("jwt", token,
        { httpOnly: true, secure: secureCookie, maxAge: parseInt(process.env.JWT_EXPIRATION as string, 10), });
      return res.status(200).send({ username: user.username });
    }
  )(req, res);
}


export function signout(req: Request, res: Response) {
  res.clearCookie("jwt");
  res.status(200).send("Déconnexion");}

  
export async function deleteUser(req: Request, res: Response) {
  const user = res.locals.user as User
  const pseudo = user.username
  const userDeleted = await deleteUserInDb(pseudo)
  if (userDeleted)
    return res.status(200).send('ok')
  return res.status(400).send('error')
}

export async function getUser(req: Request, res: Response) {
  const user = res.locals.user as User
  const id = user.id
  const userInDb = await getUserWithId(id)
  if (userInDb)
    return res.status(200).json(userInDb)
  if (cookieExtractor(req)){
    res.clearCookie("jwt");
    return res.status(401).send('error')
  }
  return res.status(400).send('error')
}

interface RequestBodyResetPassword {
  email: string;
}

export async function requestResetPassword(req: Request, res: Response) {
  const requestBody: RequestBodyResetPassword = req.body as RequestBodyResetPassword;
  const { email } = requestBody
  const code: string = generateString(8)
  const mailClient = new Mail()
  try {
    const user = await getUserWithEmail(email)
    if (!user) return res.status(400).send('errorRequestPassword')
    await updateUser(user.id, { code: code })
    await mailClient.sendMailFromTemplate("requestResetPassword",
      email, Mail.adminEmail, Mail.reportName, {
        code: code, username: user.username
      })
    return res.status(200).send('ok')
  } catch (error) {
    console.error(error)
    return res.status(400).send('errorRequestPassword') 
  }

}

interface IResetPassword {
  password: string;
  code: string;
  email: string;
}

export async function resetPassword(req: Request, res: Response) {
  const { password, code, email } = req.body as IResetPassword
  try {
    const user = await getUserWithEmail(email)
    if (!user) return res.status(400).send('errorRequestPassword')
    if (user.code !== "" && user.code !== code) return res.status(400).send('errorMatchCode')

    const hashedPassword = await bcrypt.hash(password, 10);
    await updateUser(user.id, { password: hashedPassword, code: "" })
    return res.status(200).send('ok')
  } catch (error) {
    return res.status(400).send('errorRequestPassword')
  }
  
}

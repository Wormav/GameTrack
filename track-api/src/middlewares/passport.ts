import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import passport from "passport";

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  passport.authenticate('jwt', { session: false }, (_err: string, jwt: JwtPayload) => {

    if (!jwt) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  })(req, res, next);
}

export const addUserInRequest = (req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  passport.authenticate('jwt', { session: false }, (error: string, user: User, r: { message: string }) => {
    if (!user) {
      const { message } = r;
      return res.status(401).json({ error: message ?? error });
    }
    res.locals.user = user;
    next();
  })(req, res, next);
}

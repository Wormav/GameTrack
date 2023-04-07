import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import passport from "passport";

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err: string, jwt: JwtPayload) => {

      if (!jwt) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  })(req, res, next);
}

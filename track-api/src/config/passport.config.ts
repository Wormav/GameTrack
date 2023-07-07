import passport from "passport";
import { Strategy as JwtStrategy, StrategyOptions, JwtFromRequestFunction } from "passport-jwt";
import {Strategy as LocalStrategy } from 'passport-local';
import { getUserWithEmail } from "../database/clients/users.client";
import bcrypt from 'bcrypt';
import { app } from "..";
import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

app.use(passport.initialize())
passport.use('local', new LocalStrategy({
  usernameField: "email",
  passwordField: "password",
}, (email, password, done) => {
  getUserWithEmail(email)
    .then(user => {
      if (!user) {
        return done(null, false, { message: `Cet utilisateur n'existe pas !` });
      }
      
      bcrypt.compare(password, user.password)
        .then(passwordsMatch => {
          if (passwordsMatch) {
            return done(null, user, { message: 'Connexion réussite' });
          } else {
            return done(null, false, { message: 'Mot de passe incorrect !' });
          }
        })
        .catch(error => done(error));
    })
    .catch(error => done(error));
}));


const cookieExtractor: JwtFromRequestFunction = function (req: Request): string | null {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { cookies }: { cookies: { jwt?: string } } = req;
  return cookies.jwt || null;
};

const jwtOptions: StrategyOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET,
};

passport.use('jwt', new JwtStrategy(jwtOptions, (jwtPayload: JwtPayload, done: (error: string | null, user?: JwtPayload) => void) => {
  if (Date.now() > jwtPayload.expires) {
    return done('jwt expired');
  }

  return done(null, jwtPayload);
}));
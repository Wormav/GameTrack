import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import {Strategy as LocalStrategy } from 'passport-local';
import { getUserWithEmail } from "../database/client";
import bcrypt from 'bcrypt';
import { app } from "..";
import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

app.use(passport.initialize())
passport.use('local', new LocalStrategy({
  usernameField: "email",
  passwordField: "password",
}, async (email:string, password:string, done: Function) => {
  try {
    const user = await getUserWithEmail(email)
    if (!user)
    {
      return done(null, false, { message: `Cet utilisateur n'existe pas !` });
    }

    const passwordsMatch = await bcrypt.compare(password, user!.password);
    if (passwordsMatch) {
      return done(null, user, { message: 'Connexion réussite' });
    } else {
      return done(null, false, { message: 'Mot de passe incorrect !' });
    }
  } catch (error) {
    return done(error);
  }
}));

const cookieExtractor = function (req: Request) {
  const { cookies } = req;
  return cookies.jwt;
};

const jwtOptions: StrategyOptions = {
  jwtFromRequest: cookieExtractor,
     secretOrKey: process.env.JWT_SECRET,
}

passport.use('jwt', new JwtStrategy(jwtOptions,
(jwtPayload: JwtPayload, done: Function) => {
  if (Date.now() > jwtPayload.expires) {
    return done('jwt expired');
  }

  return done(null, jwtPayload);
} )
);

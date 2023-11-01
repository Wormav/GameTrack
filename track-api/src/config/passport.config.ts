import passport from "passport";
import { Strategy as JwtStrategy, StrategyOptions } from "passport-jwt";
import {Strategy as LocalStrategy } from 'passport-local';
import { getUserWithEmail } from "../database/clients/users.client";
import bcrypt from 'bcrypt';
import { app } from "..";
import { JwtPayload } from "jsonwebtoken";
import cookieExtractor from "../utils/request";

app.use(passport.initialize())
passport.use('local', new LocalStrategy({
  usernameField: "email",
  passwordField: "password",
}, (email, password, done) => {
  getUserWithEmail(email)
    .then(user => {
      if (!user) {
        return done(null, false, { message: `Email ou mot de passe incorrect !` });
      }
      
      bcrypt.compare(password, user.password)
        .then(passwordsMatch => {
          if (passwordsMatch) {
            return done(null, user, { message: 'Connexion réussite' });
          } else {
            return done(null, false, { message: 'Email ou mot de passe incorrect !' });
          }
        })
        .catch(error => done(error));
    })
    .catch(error => done(error));
}));

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

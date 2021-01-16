import passport from "passport";
import passportLocal from "passport-local";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { userInterface } from "../Interfaces/UserInterface";
import { DatabaseUserInterface } from "../Interfaces/UserInterface";

const LocalStrategy = passportLocal.Strategy;

passport.use(
  new LocalStrategy((username: string, password: string, done) => {
    User.findOne({ username: username }, (err, user: DatabaseUserInterface) => {
      if (err) throw err;
      if (!user) return done(null, false);
      bcrypt.compare(password, user.password, (err, result: boolean) => {
        if (err) throw err;
        if (result === true) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    });

    passport.serializeUser((user: DatabaseUserInterface, cb) => {
      cb(null, user._id);
    });

    passport.deserializeUser((id: string, cb) => {
      User.findOne({ _id: id }, (err, user: DatabaseUserInterface) => {
        const userInformation: userInterface = {
          username: user.username,
          isAdmin: user.isAdmin,
          id: user._id,
        };
        cb(err, userInformation);
      });
    });
  })
);

export default passport
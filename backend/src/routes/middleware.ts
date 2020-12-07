import { NextFunction, Request, Response } from "express";
import { DatabaseUserInterface } from "../Interfaces/UserInterface";
import User from "../models/User";


const isAdministratorMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { user }: any = req;
    if (user) {
      User.findOne(
        { username: user.username },
        (err, doc: DatabaseUserInterface) => {
          if (err) throw err;
          if (doc?.isAdmin) {//el signo de pregunta refleja que es opcional, puede no haber req.body y lo deja undefined
            next();
          } else {
            res.send("Only admins can perfom this.");
          }
        }
      );
    } else {
      res.send("Sorry youre not logged in");
    }
  };

export default isAdministratorMiddleware;
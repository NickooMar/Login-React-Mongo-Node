import mongoose from "mongoose";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";
import session from "express-session";
import bcrypt from "bcryptjs";
import User from "./models/User";
import { config } from "./config";
import { userInterface } from "./Interfaces/UserInterface";
import { DatabaseUserInterface } from "./Interfaces/UserInterface";
import userRoutes from "./routes/users.routes";

//------------------------Mongoose----------------------
mongoose
  .connect(`mongodb://${config.MONGO_HOST}/${config.MONGO_DATABASE}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection has been made");
  })
  .catch((err) => console.log(err));
//------------------------------------------------------

//---------------------MiddleWare-----------------------
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", //Localizacion del cliente (react)
    credentials: true,
  })
);
app.use(
  session({
    secret: config.SECRET_CODE,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


//------------------Rutas--------------------
app.use(userRoutes);

//------------------------------------------

//----------------Listen----------------------
app.listen(4000, () => {
  console.log("Server Started");
});

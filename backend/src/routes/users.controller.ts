import { RequestHandler } from "express";
import User from "../models/User";
import { DatabaseUserInterface } from "../Interfaces/UserInterface";
import bcrypt from "bcryptjs";
import { userInterface } from "../Interfaces/UserInterface";

export const createUser: RequestHandler = async (req, res) => {
  const { username, password } = req?.body;

  User.findOne({ username }, async (err, doc: DatabaseUserInterface) => {
    //Siempre que llamemos a mongo hay que usar la Interface de database DatabaseUserInterface
    if (err) throw err;
    if (doc) res.send("User already Exist");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        password: hashedPassword,
      });
      await newUser.save();
      res.send("success");
      console.log(newUser);
    }
  });
};

export const loginUser: RequestHandler = (_, res) => {
  res.send("success");
};

export const getUser: RequestHandler = (req, res) => {
  res.send(req.user);
};

export const logout: RequestHandler = (req, res) => {
  req.logout();
  res.send("success");
};

export const getAllUsers: RequestHandler = async (req, res) => {
  await User.find({}, (err, data: DatabaseUserInterface[]) => {
    if (err) throw err;

    const filteredUsers: userInterface[] = [];
    data.forEach((item: DatabaseUserInterface) => {
      const userInformation = {
        id: item._id,
        username: item.username,
        isAdmin: item.isAdmin,
      };
      filteredUsers.push(userInformation);
    });
    res.send(filteredUsers);
  });
};

export const deleteUser: RequestHandler = async (req, res) => {
  const { id } = req?.body; //el signo de pregunta refleja que es opcional, puede no haber req.body y lo deja undefined
  await User.findByIdAndDelete(id, (err) => {
    if (err) throw err;
  });
  res.send("success");
};

export const SetAdminUser: RequestHandler = async (req, res) => {
  const { id } = req?.body;
  await User.findByIdAndUpdate(id, { isAdmin: true }, (err: any) => {
    if (err) throw err;
  });
  res.send("success");
};

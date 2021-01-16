import express from "express";
import passport from "../auth/passport"; //Al importar passport tengo que importar toda la logica, no solo el modulo (la logica ya contiene al modulo.)
import isAdministratorMiddleware from "./middleware";

import * as userCtrl from "./users.controller";

const router = express();

router.post("/register", userCtrl.createUser);

router.post("/login", passport.authenticate("local"), userCtrl.loginUser);

router.get("/user", userCtrl.getUser);

router.get("/logout", userCtrl.logout);

//Protected Route
router.get("/getallusers", isAdministratorMiddleware, userCtrl.getAllUsers);

router.post("/deleteuser", isAdministratorMiddleware, userCtrl.deleteUser);

router.post("/setAdminUser", isAdministratorMiddleware, userCtrl.SetAdminUser);

export default router;

import express from "express";
import controllerBeers from "../controllers/controllerBeers";
import controllerRegistrationUser from "../controllers/createUserController";
import loginUserController from "../controllers/loginUserController";

const router = express.Router();

router.get('/beers', controllerBeers.getBeers);

router.get('/registration', controllerRegistrationUser.createUser);

router.post('/login', loginUserController.login);

export default router;
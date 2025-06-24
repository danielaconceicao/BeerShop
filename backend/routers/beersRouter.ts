import express from "express";

import { getBeers, getBeerById } from "../controllers/controllerBeers";
import { createUser } from "../controllers/createUserController";
import { login } from "../controllers/loginUserController";
import { getAllUser } from "../controllers/getAllUser";

import { registrationValidationRules } from "../middlewares/registrationValidationRules";
import { loginValidationRules } from "../middlewares/authValidation";
import { validationHandler } from "../middlewares/validationHandler";
/* import { VerifyToken } from "../middlewares/verifyToken"; */

const router = express.Router();

router.get('/beers', getBeers);

router.get('/checkEmail', getAllUser);

router.post('/registration', registrationValidationRules, validationHandler, createUser);

router.post('/login', loginValidationRules, validationHandler, login);

router.get('beers/:id', getBeerById);

export default router;
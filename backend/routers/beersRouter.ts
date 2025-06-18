import express from "express";

import { getBeers, getBeerById } from "../controllers/controllerBeers";
import { createUser } from "../controllers/createUserController";
import { login } from "../controllers/loginUserController";

import { registrationValidationRules } from "../middlewares/registrationValidationRules";
import { loginValidationRules } from "../middlewares/authValidation";
import { validationHandler } from "../middlewares/validationHandler";

const router = express.Router();

router.get('/beers', getBeers);

router.get('/:id', getBeerById);

router.post('/registration', registrationValidationRules, validationHandler, createUser);

router.post('/login', loginValidationRules, validationHandler, login);

export default router;
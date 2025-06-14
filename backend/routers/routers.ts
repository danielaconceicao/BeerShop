import express from "express";
import controllerBeers from "../controllers/controllerBeers";

const router = express.Router();

router.get('/beers', controllerBeers.getBeers);

export default router
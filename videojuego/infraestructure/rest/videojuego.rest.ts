import express, { Request, Response } from "express";

import VideojuegoRepository from "../../domain/videojuego.repository";
import VideojuegoRepositorySQL from "../db/videojuego.repositorySQL";
const videojuegoRepository: VideojuegoRepository = new VideojuegoRepositorySQL();

const router = express.Router();

router.get("/get", async (req: Request, res: Response) => {
    let result = await videojuegoRepository.get();
    res.json(result);
});

router.put("/put", async (req: Request, res: Response) => {
    let result = await videojuegoRepository.put();
    res.json(result);
});


export default router;

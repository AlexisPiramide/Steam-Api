import express, { Request, Response } from "express";

import VideojuegoRepository from "../../domain/videojuego.repository";
import VideojuegoRepositorySQL from "../db/videojuego.repositorySQL";
import VideojuegoUseCases from "../../aplication/videojuego.usecases";

const videojuegoRepository: VideojuegoRepository = new VideojuegoRepositorySQL();

const  videojuegoUseCases: VideojuegoUseCases = new VideojuegoUseCases(videojuegoRepository);

const router = express.Router();


export default router;

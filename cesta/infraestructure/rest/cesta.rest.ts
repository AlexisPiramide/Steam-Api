import express, { Request, Response } from "express";


import CestaRepository from "../../domain/cesta.repository";
import CestaUseCases from "../../aplication/cesta.usecases";
import CestaRepositorySQL from "../db/cesta.repositorySQL";

const cestasRepository: CestaRepository = new CestaRepositorySQL();

const cestasUseCases: CestaUseCases = new CestaUseCases(cestasRepository);

const router = express.Router();

router.get("/get/:{tipo}", async (req: Request, res: Response) => {
    let usuario = JSON.parse(req.body.usuario);
    let tipo = String(req.params.tipo);
    let estado;
    if (tipo == "Compra") {
        estado = "true";
    }if(tipo == "Cesta") {
        estado = "false";
    }else{
        res.json("Error, solo se puede buscar por Compra o Cesta");
    }

    let result = await cestasUseCases.get(usuario,estado);
    res.json(result);
});

router.post("/crear", async (req: Request, res: Response) => {
    let result = await cestasUseCases.create(req.body);
    res.json(result);
});

router.post("/add", async (req: Request, res: Response) => {

    let Juego = JSON.parse(req.body.videojuego);
    let Usuario = JSON.parse(req.body.usuario);

    let result = await cestasUseCases.add(Juego,Usuario);
    res.json(result);
});

router.post("/update", async (req: Request, res: Response) => {
    let cesta = JSON.parse(req.body.cesta);
    let usuario = JSON.parse(req.body.usuario);

    let result = await cestasUseCases.update(cesta,usuario);
    res.json(result);
});

router.post("/delete", async (req: Request, res: Response) => {
    let result = await cestasUseCases.delete(req.body);
    res.json(result);
});


export default router;

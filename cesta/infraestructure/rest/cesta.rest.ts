import express, { Request, Response } from "express";
import {isAuth} from "../../../context/security/auth";

import CestaRepository from "../../domain/cesta.repository";
import CestaUseCases from "../../aplication/cesta.usecases";
import CestaRepositorySQL from "../db/cesta.repositorySQL";
import Usuario from "../../../usuario/domain/usuario";

const cestasRepository: CestaRepository = new CestaRepositorySQL();

const cestasUseCases: CestaUseCases = new CestaUseCases(cestasRepository);

const router = express.Router();

router.get("/get/:tipo",isAuth, async (req: Request, res: Response) => {

    let usuario = req.body;
    let tipo = String(req.params.tipo);

    let estado: boolean = false;
    if (tipo == "Compra") {
        estado = true;
    }if(tipo == "Cesta") {
        estado = false;
    }else{
        res.json("Error, solo se puede buscar por Compra o Cesta");
    }

    let result = await cestasUseCases.get(usuario,estado);
    res.json(result);
});

router.post("/crear", isAuth, async (req: Request, res: Response) => {
    let result = await cestasUseCases.create(req.body);
    res.json(result);
});

router.post("/add", isAuth, async (req: Request, res: Response) => {

    let Juego = (req.body.videojuego);
    let Usuario = (req.body.usuario);
    let result = await cestasUseCases.add(Juego,Usuario);
    res.json(result);

});

router.post("/update", isAuth, async (req: Request, res: Response) => {
    let cesta = (req.body.cesta);
    let usuario = (req.body.usuario);

    let result = await cestasUseCases.update(cesta,usuario);
    res.json(result);
});

router.post("/delete", isAuth, async (req: Request, res: Response) => {
    let result = await cestasUseCases.delete(req.body);
    res.json(result);
});


export default router;

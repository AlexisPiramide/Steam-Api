import express, { Request, Response } from "express";

import UsuarioRepository from "../../domain/usuario.repository";
import UsuarioRepositorySQL from "../db/usuario.repositorySQL";
import UsuarioUseCases from "../../aplication/usuario.usecases"
const usuarioRepository: UsuarioRepository = new UsuarioRepositorySQL();
const usuarioUseCases = new UsuarioUseCases(usuarioRepository);
import { createToken } from "../../../context/security/auth";

const router = express.Router();

router.post("/registro", async (req: Request, res: Response) => {
    let usuario = req.body;
    let result = await usuarioUseCases.registro(usuario);
    res.json(result); 
});
 
router.get("/login", async (req: Request, res: Response) => {
    let body = req.body;

    let usuario = await usuarioUseCases.login(body);
    if (usuario === null)
      res.status(404).json({ mensaje: "Usuario no encontrado" });
    const token = createToken(usuario);
    res.json({ token });
});

export default router;

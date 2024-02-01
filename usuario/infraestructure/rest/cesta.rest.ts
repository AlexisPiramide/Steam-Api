import express, { Request, Response } from "express";

import UsuarioRepository from "../../domain/usuario.repository";
import UsuarioRepositorySQL from "../db/cesta.repositorySQL";
import UsuarioUseCases from "../../aplication/usuario.usecases";

const usuarioRepository: UsuarioRepository = new UsuarioRepositorySQL();

const usuarioUseCases: UsuarioUseCases = new UsuarioUseCases(usuarioRepository);

const router = express.Router();


export default router;

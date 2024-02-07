import { compare } from "bcrypt";
import { hash } from "../../context/security/encripter.hash";
import UsuarioRepository from "../domain/usuario.repository";
import Usuario from "../domain/usuario";
import {createToken, decode} from "../../context/security/auth";

export default class UsuarioUseCases{
    constructor(private usuarioRepository: UsuarioRepository) {}

    async registro(usuario: Usuario): Promise<Usuario> {
        if (!usuario.contraseña) throw new Error("Falta password");
        const cifrada = hash(usuario.contraseña);
        usuario.contraseña = cifrada;
        
        return this.usuarioRepository.registro(usuario);
      }
    
      async login(usuario: Usuario): Promise<Usuario> {
        if (!usuario.contraseña) throw new Error("Falta password");
        const usuarioBD = await this.usuarioRepository.login(usuario);
        if (!usuarioBD) throw new Error("Usuario no encontrado");
        const iguales = await compare(usuario.contraseña, String(usuarioBD.contraseña));
        if (iguales) {
          return usuarioBD;
        } else {
          throw new Error("Usuario/contraseña no es correcto");
        }
      }
}
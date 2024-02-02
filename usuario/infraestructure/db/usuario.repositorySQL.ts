import executeQuery from "../../../context/db/postgres";
import Usuario from "../../domain/usuario";
import UsuarioRepository from "../../domain/usuario.repository";

export default class UsuarioRepositorySQL implements UsuarioRepository {

    async registro(usuario: Usuario): Promise<Usuario> {
        const { nombre, contraseña } = usuario;
        const query = `INSERT INTO usuarios (nombre, contraseña) VALUES ('${nombre}', '${contraseña}') returning *`;
        const rows: any[] = await executeQuery(query);
        const usuarioDB: Usuario = {
            nombre: rows[0].nombre,
            contraseña: rows[0].contraseña,
        };
        return usuarioDB;
    }
    
    
  async login(usuario: Usuario): Promise<Usuario> {
    const { nombre } = usuario;
    const query = `SELECT * FROM usuarios WHERE nombre = '${nombre}'`;
    const rows: any[] = await executeQuery(query);
    if (rows.length === 0) {
      throw new Error("Usuario/contraseña no es correcto");
    } else {
      const usuarioDB: Usuario = {
        nombre: rows[0].nombre,
        contraseña: rows[0].contraseña,
      };
      return usuarioDB;
    }
  }
}
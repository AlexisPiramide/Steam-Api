import Usuario from "../../usuario/domain/usuario";
import Videojuego from "../../videojuego/domain/videojuego";


export default interface Cesta{
    id: Number;
    usuario: Usuario;
    videojuegos: Videojuego[];
    estado: boolean;
    fecha: Date;
}

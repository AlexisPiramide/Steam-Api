import Usuario from "../../usuario/domain/usuario";
import Videojuego from "../../videojuego/domain/videojuego";
import Cesta from "./cesta";


export default interface CestaRepository {
    get(usuario: Usuario, estado: boolean): Promise <Cesta | Cesta [] | undefined>;
    create(usuario: Usuario): Promise <Cesta | undefined>;
    add(videojuego : Videojuego, usuario: Usuario): Promise <Cesta | undefined>;
    update(cesta: Cesta) : Promise <Cesta | undefined>;
    delete(cesta: Cesta): Promise <Cesta | undefined>;
}
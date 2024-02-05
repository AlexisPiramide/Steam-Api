import Videojuego from "./videojuego";

export default interface VideojuegoRepository{
    get(): Promise <Videojuego[] | undefined>;
    put(): Promise <boolean>; 
}
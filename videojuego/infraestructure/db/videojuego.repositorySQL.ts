
import executeQuery from "../../../context/db/postgres";
import Videojuego from "../../domain/videojuego";
import VideojuegoRepository from "../../domain/videojuego.repository";

export default class VideojuegoRepositorySQL implements VideojuegoRepository {

    async get(): Promise<Videojuego[] | undefined> {
        let Query = `SELECT * FROM videojuegos`;
        try{
            let result  = await executeQuery(Query);
            return result;
        }catch(e){
            console.log(e)
           return undefined;
        }
    }
}
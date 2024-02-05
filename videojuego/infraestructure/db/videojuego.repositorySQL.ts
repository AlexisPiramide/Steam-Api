import format from "pg-format";
import executeQuery from "../../../context/db/postgres";
import Videojuego from "../../domain/videojuego";
import VideojuegoRepository from "../../domain/videojuego.repository";
import axios from 'axios';

export default class VideojuegoRepositorySQL implements VideojuegoRepository {

    async put(): Promise<boolean> {
        const Query : string = `INSERT INTO videojuegos(id,nombre) VALUES %L`
        let videojuegos = await fetchTopGames()
      
        console.log(videojuegos)

        const valores: any[] = [];
        //cambiar esto//
        for (const videojuego of videojuegos){
            const idDelJuego = Object.keys(videojuego)[0];
            const appid = videojuego[idDelJuego].appid;
            const nombreDelJuego = videojuego[idDelJuego].name;

            valores.push([
                appid,
                nombreDelJuego
            ]);
        };

        try{
            let result  = await executeQuery(format(Query,valores));
            return result;
        }catch(e){
           return true;
        }
    }

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



async function fetchTopGames(): Promise<any> {
  const url = `https://steamspy.com/api.php?request=all`;
  const response = await axios.get(url);

  return response;
}
import format from "pg-format";
import executeQuery from "../../../context/db/postgres";
import Videojuego from "../../domain/videojuego";
import VideojuegoRepository from "../../domain/videojuego.repository";

export default class VideojuegoRepositorySQL implements VideojuegoRepository {

    async put(): Promise<boolean> {
        const Query: string = `INSERT INTO videojuegos(id, nombre) VALUES %L`;
        try {
            let videojuegos = await fetchTopGames();
    
            console.log("Videojuegos cargados");
    
            const valores: any[] = [];
    
            for (const videojuego in videojuegos) {

                if(videojuegos[videojuego].appid && videojuegos[videojuego].nane){
                valores.push({ nombre: videojuegos[videojuego].name, id: parseInt(videojuegos[videojuego].appid) });
            }
            }
    
            let result = await executeQuery(format(Query, valores));
            return result;
        } catch (e) {
            console.error("Error inserting videojuegos:", e);
            return false;
        }
    
    }

    async get(): Promise<Videojuego[] | undefined> {
        let Query = `SELECT * FROM videojuegos`;
        try {
            let result = await executeQuery(Query);
            return result;
        } catch (e) {
            console.log(e)
            return undefined;
        }
    }
}



async function fetchTopGames(): Promise<any> {


    const url = `http://steamspy.com/api.php?request=top100in2weeks`;
    let data;
    
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

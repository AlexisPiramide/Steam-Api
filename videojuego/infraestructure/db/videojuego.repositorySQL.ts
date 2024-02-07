import format from "pg-format";
import executeQuery from "../../../context/db/postgres";
import Videojuego from "../../domain/videojuego";
import VideojuegoRepository from "../../domain/videojuego.repository";

export default class VideojuegoRepositorySQL implements VideojuegoRepository {
    async put(): Promise<boolean> {
        const dataFormatted: Array<[number, string]> = []

        try {
            const response = await fetch('https://steamspy.com/api.php?request=top100in2weeks')
            const data: any = await response.json()
            console.log(data);

            Object.keys(data).forEach(key => {
                dataFormatted.push([data[key].appid, data[key].name])
            })
        } catch (error) {
            console.error(error)
        }

        console.log("Datos", dataFormatted)

        try {
            const Query: string = `INSERT INTO videojuegos(id, nombre) VALUES %L`;
            let result = await executeQuery(format(Query, dataFormatted));
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



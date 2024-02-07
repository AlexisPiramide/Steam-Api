import executeQuery from "../../../context/db/postgres";
import Usuario from "../../../usuario/domain/usuario";
import Videojuego from "../../../videojuego/domain/videojuego";
import Cesta from "../../domain/cesta";
import CestaRepository from "../../domain/cesta.repository";

export default class CestaRepositorySQL implements CestaRepository {

    async get(usuario: Usuario, estado: boolean): Promise<Cesta | Cesta[] | undefined> {
        let Query = `SELECT * FROM cesta WHERE usuario_id=${usuario.id} and estado=${estado}`;
        try{
            let result  = await executeQuery(Query);
            return result;
        }catch(e){
            console.log(e)
           return undefined;
        }
    }


    async create(usuario: Usuario): Promise<Cesta | undefined> {
        let Query = `INSERT INTO cesta (usuario_id,estado) VALUES ('${usuario.id}','${false}')`;
        try{
            let result  = await executeQuery(Query);
            return result;
        }catch(e){
            console.log(e)
            return undefined
        }
    }
    async add(videojuego: Videojuego, usuario: Usuario): Promise<Cesta | undefined> {

        let Query = `UPDATE cesta SET videojuego = array_append(videojuego, '{"id": "'${videojuego.id}'","usuario_id": "'${videojuego.nombre}'"}'::JSON) WHERE estado='${false} AND usuario_id='${usuario.id}'`;
        try{
            let result  = await executeQuery(Query);
            return result;
        }catch(e){
            console.log(e)
            return undefined
        }
    }
    update(cesta: Cesta): Promise<Cesta | undefined> {
        let Query = `UPDATE cesta SET estado='${true}', set fecha='' WHERE id='${cesta.id}'`;
        try{
            let result  = executeQuery(Query);
            return result;
        }catch(e){
            console.log(e)
            return Promise.resolve(undefined);
        }
    }
    delete(cesta: Cesta): Promise<Cesta | undefined> {
        let Query = `DELETE FROM cesta WHERE id='${cesta.id}'`;
        try{
            let result  = executeQuery(Query);
            return result;
        }catch(e){
            console.log(e)
            return Promise.resolve(undefined);
        }
    }
}
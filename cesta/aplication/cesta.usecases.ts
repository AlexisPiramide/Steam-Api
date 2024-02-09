import Usuario from "../../usuario/domain/usuario";
import Videojuego from "../../videojuego/domain/videojuego";
import Cesta from "../domain/cesta";

import CestaRepositorySQL from "../infraestructure/db/cesta.repositorySQL";

export default class CestaUseCases{
    constructor(private cestaRepository: CestaRepositorySQL) {}

    async get(usuario: Usuario, estado: boolean) {
        let result = await this.cestaRepository.get(usuario, estado);
        return result;
    }

    async create(usuario: Usuario) {
        let result = await this.cestaRepository.create(usuario);
        return result;
    }

    async add(videojuego: Videojuego, usuario: Usuario) {
        let result = await this.cestaRepository.add(videojuego, usuario);
        return result;
    }

    async update(cesta: Cesta, usuario: Usuario) {
        let resultUpdate = await this.cestaRepository.update(cesta);
        let resultCreate = await this.cestaRepository.create(usuario);

        let result = {
            "Cesta Comprada":
            resultUpdate,
            "Nueva Cesta":
            resultCreate
        }

        return result;
    }

    async delete(cesta: Cesta) {
        let result = await this.cestaRepository.delete(cesta);
        return result;
    }

}
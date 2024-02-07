import UsuarioRepositorySQL from '../usuario/infraestructure/db/usuario.repositorySQL';
import { compare } from '../context/security/encripter.hash';
import {decode} from '../context/security/auth';

describe('UsuarioRepositorySQL', () => {
    let usuarioRepository: UsuarioRepositorySQL;

    beforeEach(() => {
        usuarioRepository = new UsuarioRepositorySQL();
    });

    it('Crear Usuario', async () => {
        const Usuario = {
            nombre: 'John Doe',
            contraseña: 'contraseña123',
        };

        const resultado = usuarioRepository.registro(Usuario);

        expect(resultado).toBeDefined();
        expect(resultado).toBeDefined();

        if (resultado) {
            expect((await resultado).nombre).toBe(Usuario.nombre);
            expect(compare(Usuario.contraseña, (await resultado).contraseña)).toBe(true);
        }
    });

    it('Iniciar Sesion', async () => {

        const Usuario = {
            nombre: 'John Doe',
            contraseña: 'contraseña123',
        };

        const resultado = usuarioRepository.login(Usuario);

        expect(resultado).toBeDefined();

        if (resultado) {
            expect((await resultado)).toBe(Usuario.nombre);
            expect(compare(Usuario.contraseña, (await resultado).contraseña)).toBe(true);
        }
    });

});
import * as Steganography from 'ts-steganography';


function Codificador(Contraseña: string, enlaceImagen: string) {

    let imagen;

    convertirImagen(enlaceImagen)
        .then((base64String) => {
            imagen = base64String;
        })
        .catch((error) => {
            console.error(error);
        });


    let encoded = Steganography.encode(Contraseña, imagen);
    return encoded;
}


function Decodificador(enlaceImagen: string) {

    let decoded = Steganography.decode(enlaceImagen);
    return decoded;
}


function convertirImagen(imagePath: string): Promise<string> {
    const fs = require('fs');
    return new Promise((resolve, reject) => {
        fs.readFile(imagePath, 'base64', (err, data) => {
            if (err) {
                reject(err);
            } else {
                const base64String = `data:image/png;base64,${data}`;
                resolve(base64String);
            }
        });
    });
}

export { Codificador, Decodificador}
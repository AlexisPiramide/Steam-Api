
CREATE TABLE cesta (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuario(id),
    videojuego JSONB,
    estado BOOLEAN,
    fecha DATE
);

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    contraseña VARCHAR(255) NOT NULL
);

CREATE TABLE videojuegos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);
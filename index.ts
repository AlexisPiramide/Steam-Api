import express from "express";

import routervideojuego from "./videojuego/infraestructure/rest/videojuego.rest" ;
import routercesta from "./cesta/infraestructure/rest/cesta.rest";

const app = express();
const port = 8080;

app.use(express.json());


app.use("/api/videojuego", routervideojuego);
app.use("/api/cesta", routercesta);


app.listen(port, () => {    
    console.log( `server started at http://localhost:${port}`);
});
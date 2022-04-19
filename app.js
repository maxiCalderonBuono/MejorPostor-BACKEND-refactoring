//Configuramos dotenv
require("dotenv").config();

// Genera los roles la primer vez que se inicializa la app

const { createRoles } = require("./config/InitialSetup.js");
createRoles();

//Server
const Server = require("./routes/server.js");
const server = new Server();

server.listen(); //inicializacion del server

const { createRoles } = require("./config/InitialSetup.js");

//Configuramos dotenv
require("dotenv").config();

// Genera los roles la primer vez que se inicializa la app
createRoles();

//Server
const Server = require("./models/server.js");
const server = new Server();

server.listen(); //inicializacion del server

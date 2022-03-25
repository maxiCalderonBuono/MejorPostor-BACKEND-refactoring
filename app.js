//Configuramos dotenv
require("dotenv").config();

//Server
const Server = require("./models/server.js");
const server = new Server();

server.listen(); //inicializacion del server

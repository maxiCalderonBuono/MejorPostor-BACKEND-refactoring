//Configuramos dotenv
require("dotenv").config();
const mongoose = require("mongoose");

// Genera los roles la primer vez que se inicializa la app

const { createRoles } = require("./config/InitialSetup.js");
createRoles();

//Server
const Server = require("./routes/server.js");
const server = new Server();

mongoose.connection.once("open", () => {
  server.listen();
});

//inicializacion del server

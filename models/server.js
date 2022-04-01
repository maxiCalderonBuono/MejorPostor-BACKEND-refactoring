const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const DBConnection = require("../config/Db.js");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.urlServer = process.env.URL_SERVER;
    this.userRoutesPath = "/api/users";
    this.authRoutesPath = "/api/auth";

    // DataBase
    DBConnection();

    //Middlewares
    this.middlewares();

    //Rutas de la app
    this.routes();
  }

  middlewares() {
    //Configuracion CORS

    this.app.use(cors());

    //Morgan
    this.app.use(logger("dev"));

    //lectura de datos enviados en el body  de la peticion
    this.app.use(express.json());

    //Configuracion del directorio publico
    this.app.use(express.static("public"));
  }

  //definimos las rutas
  routes() {
    //rutas de usuario
    this.app.use(this.userRoutesPath, require("../routes/users.js"));

    //rutas de auth
    this.app.use(this.authRoutesPath, require("../routes/auth.js"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on ${this.urlServer}:${this.port}`);
    });
  }
}

module.exports = Server;

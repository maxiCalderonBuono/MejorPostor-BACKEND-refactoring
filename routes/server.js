const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const DBConnection = require("../config/Db.js");
const allowedOrigins = [
  "http://localhost:3000" /*'ACÁ VA LA URL DEL FRONT DE HEROKU'*/,
];
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.urlServer = process.env.URL_SERVER;
    this.userRoutesPath = "/api/users";
    this.authRoutesPath = "/api/auth";
    this.productRoutesPath = "/api/products";
    this.paymentRoutesPath = "/api/payment";

    // DataBase
    DBConnection();

    //Middlewares
    this.middlewares();

    //Rutas de la app
    this.routes();
  }

  middlewares() {
    //Configuracion CORS

    this.app.use(cors({ origin: allowedOrigins }));

    //Morgan
    this.app.use(logger("dev"));

    //lectura de datos enviados en el body  de la peticion
    this.app.use(express.json({ extend: true }));
  }

  //definimos las rutas
  routes() {
    //rutas de usuario
    this.app.use(this.userRoutesPath, require("./users.js"));

    //rutas de auth
    this.app.use(this.authRoutesPath, require("./auth.js"));

    //rutas de productos
    this.app.use(this.productRoutesPath, require("./product.js"));

    //rutas de pago
    this.app.use(this.paymentRoutesPath, require("./payment.js"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on ${this.urlServer}:${this.port}`);
    });
  }
}

module.exports = Server;

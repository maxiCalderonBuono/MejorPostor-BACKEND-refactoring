const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const DBConnection = require("../config/Db.js");
const credentials = require("../middlewares/credentials.js");

const allowedOrigins = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200,
};
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
    this.app.use(credentials);
    //Configuracion CORS

    this.app.use(cors({ origin: allowedOrigins }));

    //Morgan
    this.app.use(logger("dev"));

    //lectura de datos enviados en el body  de la peticion
    this.app.use(express.json({ extend: true }));

    this.app.use(cookieParser());
  }

  //definimos las rutas
  routes() {
    this.app.use("/", require("./root.js"));
    //rutas de usuario
    this.app.use(this.userRoutesPath, require("./users.js"));

    //rutas de auth
    this.app.use(this.authRoutesPath, require("./auth.js"));

    //rutas de productos
    this.app.use(this.productRoutesPath, require("./product.js"));

    //rutas de pago
    this.app.use(this.paymentRoutesPath, require("./payment.js"));

    //Public
    this.app.use(express.static(path.join(__dirname, "/../dist")));

    // this.app.get("*", (req, res) => {
    //   res.sendFile(path.join(__dirname + "/../dist/index.html"));
    //   //res.sendFile(path.join(__dirname, "dist", "index.html"))
    // });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on ${this.urlServer}:${this.port}`);
    });
  }
}

module.exports = Server;

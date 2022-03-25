const { connect } = require("mongoose");

const DBConnection = async () => {
  try {
    await connect(process.env.STRING_SERVER_MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB is connected: MejorPostorDB");
  } catch (e) {
    console.log("Failed to connect database: ", e);
    process.exit(1); // Finalizar el proceso que se está ejecutando. Puede ser (0) o (1). 0 significa finalizar el proceso sin ningún tipo de falla y 1 significa finalizar el proceso con alguna falla.
  }
};

module.exports = DBConnection;

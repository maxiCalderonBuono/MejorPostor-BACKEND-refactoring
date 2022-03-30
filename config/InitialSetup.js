const Role = require("./../models/Role");

//  Generamos roles por defecto para poder ser usados por los usuarios

exports.createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount(); // Busco si existen documentos

    if (count > 0) return;

    const values = await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "moderator" }).save(),
      new Role({ name: "admin" }).save(),
    ]);

    console.log("values", values);
  } catch (error) {
    console.error(error);
  }
};

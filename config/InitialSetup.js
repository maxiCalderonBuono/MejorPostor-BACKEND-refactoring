const Role = require("./../models/Role");

//  Generamos roles por defecto para poder ser usados por los usuarios

exports.createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount(); // Busco si existen documentos

    if (count > 0) return;

    const values = await Promise.all([
      new Role({ name: 2001 }).save(),
      new Role({ name: 1986 }).save(),
      new Role({ name: 5101 }).save(),
    ]);
  } catch (error) {
    console.error(error);
  }
};

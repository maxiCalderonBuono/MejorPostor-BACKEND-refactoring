const verifyRoles = (...allowedOrigins) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);
    const rolesArray = [...allowedOrigins];
    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((value) => value === true);
    if (!result) return res.sendStatus(401);
    next();
  };
};

m;

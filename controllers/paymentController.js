const MP = require("mercadopago");
const successHtml = `${process.env.URL_SERVER}:${process.env.PORT_SERVER_FRONT}`;

MP.configure({
  access_token: process.env.MP_TOKEN,
});

exports.preferences = async (req, res) => {
  const { unit_price } = req.body;
  const { surname, email } = req.headers;

  console.log(req.headers);

  let preference = {
    items: [
      {
        title: `Subasta de ${surname}`,
        quantity: 1,
        unit_price: 100,
        currency_id: "ARS",
      },
    ],
    payer: {
      surname: surname,
      email: email,
    },
    back_urls: {
      success: successHtml,
      failure: "",
      pending: "",
    },
    auto_return: "all",
    statement_descriptor: "Mejor Postor",
  };

  MP.preferences
    .create(preference)
    .then(function (response) {
      res.json(response.body.sandbox_init_point);
    })
    .catch(function (error) {
      console.log(error);
    });
};

exports.view = (req, res) => {
  res.send("sistema index funcionando para las rutas");
};

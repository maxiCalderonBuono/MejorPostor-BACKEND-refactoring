const MP = require("mercadopago");
const successHtml = `${process.env.URL_SERVER}:${process.env.PORT_SERVER_FRONT}`;

MP.configure({
  _access_token: process.env.MP_TOKEN,
  get access_token() {
    return this._access_token;
  },
  set access_token(value) {
    this._access_token = value;
  },
});

exports.preferences = async (req, res) => {
  const { unit_price } = req.body;
  const { surname, email } = req.headers;

  console.log(req.headers)

  let preference = {
    items: [
      {
        title: `${surname}'s cart`,
        quantity: 1,
        unit_price: unit_price,
        currency_id: "USD",
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
      res.redirect(response.body.init_point);
    })
    .catch(function (error) {
      console.log(error);
    });
};

exports.view = (req, res) => {
  res.send("sistema index funcionando para las rutas");
};

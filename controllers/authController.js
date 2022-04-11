const User = require("../models/User");
const Role = require("../models/Role");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const privateKey = fs.readFileSync("./keys/private.pem");
const { sendEmail } = require("../services/nodemailer.js");
const { v4: uuid } = require("uuid");
const jwtOptions = { algorithm: "RS256", expiresIn: "900s" };

exports.signUp = async (req, res) => {
  try {
    const { username, password, email, roles, name, surname, birthYear } =
      req.body;

    const uid = uuid();

    const newUser = new User({
      username,
      password: await User.encryptPassword(password),
      email,
      name,
      surname,
      birthYear,
      uuidEmail: uid,
    });
    console.log("newUser", newUser);
    if (roles) {
      // Busco el id de los roles asignado, si no lo encuentra uso User por defecto
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    }

    await sendEmail({
      email: email,
      body: `<!-- THIS EMAIL WAS BUILT AND TESTED WITH LITMUS http://litmus.com -->
      <!-- IT WAS RELEASED UNDER THE MIT LICENSE https://opensource.org/licenses/MIT -->
      <!-- QUESTIONS? TWEET US @LITMUSAPP -->
      <!DOCTYPE html>
      <html>
      <head>
      <title></title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <style type="text/css">
          /* FONTS */
      
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');  
          
          * {
             font-family: 'Poppins', sans-serif;
          }
          
          /* CLIENT-SPECIFIC STYLES */
          body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
          table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
          img { -ms-interpolation-mode: bicubic; }
      
          /* RESET STYLES */
          img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
          table { border-collapse: collapse !important; }
          body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
      
          /* iOS BLUE LINKS */
          a[x-apple-data-detectors] {
              color: inherit !important;
              text-decoration: none !important;
              font-size: inherit !important;
              font-family: inherit !important;
              font-weight: inherit !important;
              line-height: inherit !important;
          }
          
          /* MOBILE STYLES */
          @media screen and (max-width:600px){
              h1 {
                  font-size: 32px !important;
                  line-height: 32px !important;
              }
          }
      
          /* ANDROID CENTER FIX */
          div[style*="margin: 16px 0;"] { margin: 0 !important; }
      </style>
      </head>
      <body style="background-color: #eaeaea; margin: 0 !important; padding: 0 !important;">
      
      <!-- HIDDEN PREHEADER TEXT -->
      <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Poppins', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
            ¡Gracias ${username} por unirte! 🚀 Estas mas cerca de ser el Mejor Postor. 🧑🏽‍⚖️ <br>
      </div>
      
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <!-- LOGO -->
          <tr>
              <td bgcolor="#05a297" align="center">
                  <!--[if (gte mso 9)|(IE)]>
                  <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                  <tr>
                  <td align="center" valign="top" width="600">
                  <![endif]-->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                      <tr>
                          <td align="center" valign="top" style="padding: 40px 10px 40px 10px;">
                              <a href="http://litmus.com" target="_blank">
                                  
                              </a>
                          </td>
                      </tr>
                  </table>
                  <!--[if (gte mso 9)|(IE)]>
                  </td>
                  </tr>
                  </table>
                  <![endif]-->
              </td>
          </tr>
          <!-- HERO -->
          <tr>
              <td bgcolor="#05a297" align="center" style="padding: 0px 10px 0px 10px;">
                  <!--[if (gte mso 9)|(IE)]>
                  <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                  <tr>
                  <td align="center" valign="top" width="600">
                  <![endif]-->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                      <tr>
                          <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Poppins', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                            <h1 style="font-size: 48px; font-weight: 400; margin: 0;">¡Bienvenido!</h1>
                          </td>
                      </tr>
                    
                  </table>
                  <!--[if (gte mso 9)|(IE)]>
                  </td>
                  </tr>
                  </table>
                  <![endif]-->
              </td>
          </tr>
          <!-- COPY BLOCK -->
          <tr>
              <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                  <!--[if (gte mso 9)|(IE)]>
                  <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                  <tr>
                  <td align="center" valign="top" width="600">
                  <![endif]-->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
      
                    <tr>
                      <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Poppins', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                        <img src="https://res.cloudinary.com/dvqlenul5/image/upload/v1648904794/logo1_ykmcgn.png" alt="logo" style=" width: 200px"/>
                      </td>
                  </tr>
                    <!-- COPY -->
                    <tr>
                      <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Poppins', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                        <p style="margin: 0;">Gracias ${username} por unirte a Mejor Postor! Primero, es necesario que confirmes tu cuenta, haciendo click en el siguiente botón.</p>
                      </td>
                    </tr>
                    <!-- BULLETPROOF BUTTON -->
                    <tr>
                      <td bgcolor="#ffffff" align="left">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tr>
                            <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                              <table border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="center" style="border-radius: 43px;" bgcolor="#32a42b"><a href="${process.env.URL_SERVER}:${process.env.PORT_SERVER_FRONT}/api/auth/verify/${uid}" target="_blank" style="font-size: 20px; font-family: Poppins, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 43px; border: 1px solid #32a42b; display: inline-block;">Confirma tu cuenta</a></td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <!-- COPY -->
                 
                    <!-- COPY -->
                    <tr>
                      <td bgcolor="#ffffff" align="center" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                        <p style="margin: 0;">Si tienes alguna duda ${username}, podés contactarnos a través de nuestra página web o redes sociales.</p>
                      </td>
                    </tr>
                    <!-- COPY -->
                    <tr>
                      <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                        <p style="margin: 0;">Saludos,<br>El equipo de mejor postor</p>
                      </td>
                    </tr>
                  </table>
                  <!--[if (gte mso 9)|(IE)]>
                  </td>
                  </tr>
                  </table>
                  <![endif]-->
              </td>
          </tr>
          <!-- FOOTER -->
          <tr>
              <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                  <!--[if (gte mso 9)|(IE)]>
                  <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                  <tr>
                  <td align="center" valign="top" width="600">
                  <![endif]-->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                    <!-- NAVIGATION -->
                  
                    <!-- PERMISSION REMINDER -->
                    <tr>
                      <td bgcolor="#C2C2C2" align="center" style="padding: 30px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;" >
                        <p style="margin: 0;">Recibiste este mail ya que acabas de registrarte en Mejor postor, </p>
                      </td>
                    </tr>
                    <!-- UNSUBSCRIBE -->
                    <tr>
                      <td bgcolor="#C2C2C2" align="center" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;" >
                        <p style="margin: 0;">Este mail fue generado de forma automática </p>
                      </td>
                    </tr>
                    <!-- ADDRESS -->
                    <tr>
                      <td bgcolor="#C2C2C2"  style="align="center"; justify-content: space-between; align-items: center; padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;" >
                        <p style="margin: 0;">Argentina - 2022</p>
                      </td>
                    </tr>   
                  </table>
                  <!--[if (gte mso 9)|(IE)]>
                  </td>
                  </tr>
                  </table>
                  <![endif]-->
              </td>
          </tr>
      </table>
      </body>
      </html>`,
    });

    await newUser.save(); // Guardo el usuario en la DB

    const payload = {
      id: newUser._id,
      username: newUser.username,
      roles: newUser.roles[0].name,
    };

    const token = jwt.sign(payload, privateKey, jwtOptions); // Genero el token

    res.status(200).json({
      token: token,
      data: payload,
      message: "User saved successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await User.findOne({ email: email }).populate("roles");

    if (!userFound) return res.status(406).json({ message: "User not found" });

    const matchPassword = await User.comparePassword(
      password,
      userFound.password
    );

    if (!matchPassword)
      return res.status(401).json({ token: null, message: "Invalid password" });

    const payload = {
 IgnacioGibbsDev
      ID: userFound._id,
      Username: userFound.username,
      Roles: userFound.roles[0].name,
      Email: userFound.email,
    };

    const token = jwt.sign(payload, privateKey, jwtOptions);

    res.json({
      token: token,
      payload: payload,
      message: "User signed in successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

exports.verify = async (req, res) => {
  try {
    const { uid } = req.params;
    await User.updateOne({ uuidEmail: uid }, { $set: { enabled: true } });
    res.status(200).redirect("/api/auth/verified");
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

exports.verified = (req, res) => {
  res.status(200).json({ message: "Verified route" });
};

exports.revalidarToken = async (req, res) => {
  const id = req.userId;
  const username = req.username;

  const payload = {
    id,
    username,
  };

  const token = jwt.sign(payload, privateKey, jwtOptions);

  res.json({ username, id, token });
};

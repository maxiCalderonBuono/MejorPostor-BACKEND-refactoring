const User = require("../models/User");
const Role = require("../models/Role");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const privateKey = fs.readFileSync("./keys/private.pem");
const { sendEmailVerification } = require("../services/emailVerification.js");
const { v4: uuid } = require("uuid");
const UserVerification = require("../models/UserVerification");
const jwtOptions = { algorithm: "RS256", expiresIn: "900s" };
const { verify } = require("hcaptcha");
const { sendEmailRecovery } = require("../services/emailPassRecovery");

exports.signUp = async (req, res) => {
  try {
    const { password, email, roles, name, surname, image, captchaToken } =
      req.body;

    if (!captchaToken)
      return res.status(400).json({ message: "Captcha is missing" });

    const captchaCheck = await verify(process.env.CAPTCHA_SECRET, captchaToken);

    if (!captchaCheck) {
      return res.status(400).json({ message: "Invalid Captcha" });
    }

    const newUser = new User({
      password: await User.encryptPassword(password),
      email,
      name,
      surname,
      image,
      captchaToken,
    });

    if (roles) {
      // Busco el id de los roles asignado, si no lo encuentra uso User por defecto
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    }

    const { _id } = await newUser.save();

    const uniqueString = uuid() + _id;

    await sendEmailVerification({
      email,
      subject: "Please verify your email address 🚀",
      uniqueString,
      _id,
      body: `<!DOCTYPE html>
      <html>
      <head>
      <title></title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <style type="text/css">
          /* FONTS */
      
         @import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@700&display=swap"); 
          
          * {
             font-family: "Nunito Sans", sans-serif;
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
      
     
     
      
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
              <td bgcolor="#3d424a" align="center">
                  
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                      <tr>
                          <td align="center" valign="top" style="padding: 40px 10px 40px 10px;">
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
          
          <tr>
              <td bgcolor="#3d424a" align="center" style="padding: 0px 10px 0px 10px;">
                 
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                      <tr>
                           <td
                bgcolor="#ffffff"
                style="
                  padding: 20px 30px;
                  font-family: 'Nunito Sans', sans-serif;
                "
              >
                <div style="width: fit-content">
                  <a
                    style="text-decoration: none"
                    href="${process.env.URL_SERVER}:${process.env.PORT_SERVER_FRONT}/"
                    target="_blank"
                    ><img
                      src="https://res.cloudinary.com/dvqlenul5/image/upload/v1664553256/Logo-word_wlz74m.png"
                      alt="Logo"
                      title="Logo"
                      style="width: 200px"
                  /></a>
                </div>
              </td>
                      </tr>
                    
                  </table>
                  
          </tr>
          
          <tr>
              <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
      
                    <tr>
                      <td style="padding: 20px 50px" bgcolor="#ffffff">
                <div
                  style="
                    height: 1px;
                    background-color: #a4a4a4;
                    line-height: 1px;
                  "
                ></div>
              </td>
                  </tr>
                    
                    <tr>
          <td bgcolor="#ffffff" style="max-width:600px; padding: 0px 30px 0px 30px; font-family:'Nunito Sans', sans-serif; font-weight: 400" class="esd-text">
              <h1 style="font-size:24px; margin:0px; color: #3d424a">Verify your email</h1>
          </td>
      </tr>
      <tr>
        <td bgcolor="#ffffff" style="display: flex; flex-direction:column; align-items:left; padding: 0px 30px 0px 30px; color: #666666; font-family:'Nunito Sans', sans-serif; font-weight: 400" class="esd-text">
          <h5 style="margin:30px 0px 10px">${name}, thank you for signing up with Mejor Postor 🥳</h5>
        </td>
      </tr>
       <tr>
        <td bgcolor="#ffffff" style="display: flex; flex-direction:column; align-items:left; padding: 0px 30px 0px 30px; color: #666666; font-family:'Nunito Sans', sans-serif; font-weight: 400" class="esd-text">
          <h5 style="margin:10px 0px 30px">Only one tiny step to go. Just verify your email address, and you're all set!.This link expires in 2 days.</h5>
        </td>
      </tr>
                   
                        <tr>
                                <td bgcolor="#ffffff" align="left">
                                    <table border="0" cellspacing="0" cellpadding="0">
                                        <tbody>
                                            <tr>
                                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px;">
                                                    <table border="0" cellspacing="0" cellpadding="0">
                                                        <tbody>
                                                            <tr>
                                                                <td align="left" style="border-radius: 10px;" bgcolor="#feae49"><a href="${process.env.URL_SERVER}:${process.env.PORT_SERVER_FRONT}/api/auth/verify/${_id}/${uniqueString}" target="_blank" style="font-size: 14px; font-family:'Nunito Sans', sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 10px 25px; display: inline-block;">Verify now</a></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 32px 50px" bgcolor="#ffffff">
                                    <div style="height:1px; background-color:#a4a4a4; line-height:1px" class="esd-text">‌</div>
                                </td>
                            </tr>
                            
                            <tr>
          <td bgcolor="#ffffff" style="max-width:600px; padding: 0px 30px 20px 30px; color: #666666; font-family:'Nunito Sans', sans-serif; font-weight: 400" class="esd-text">
              <h5 style="margin: 0;">If you're having trouble clicking the button, click on or copy the following link:</h5>                    
          </td>
      </tr>
      <tr>
          <td bgcolor="#ffffff" style="max-width:600px; padding: 0px 30px 30px 30px; font-size:12px; color: #666666; font-family:'Nunito Sans', sans-serif; font-weight: 400" class="esd-text">
              <a style="color:#fe920b; font-size:12px;" href="${process.env.URL_SERVER}:${process.env.PORT_SERVER_FRONT}/api/auth/verify/${_id}/${uniqueString}">${process.env.URL_SERVER}:${process.env.PORT_SERVER_FRONT}/api/auth/verify/${_id}/${uniqueString}</a>                      
          </td>
      </tr>
               <tr>
                                <td bgcolor="#C2C2C2" align="center" style="padding: 20px 30px 15px 30px; color: #666666; font-family:'Nunito Sans', sans-serif; font-size: 12px" class="esd-text">
                                    <p style="margin: 0; font-weight:700">Copyright © 2022 Mejor Postor</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#C2C2C2" align="center" style=" padding: 0px 30px 20px 30px; color: #666666;font-family:'Nunito Sans', sans-serif; font-size: 12px; font-weight:700" class="esd-text">
                                    <p style="margin: 0;">All rights reserved</p>
                                </td>
                            </tr>
      </table>
    </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`,
    });

    const payload = {
      id: newUser._id,
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

exports.passwordRecovery = async (req, res) => {
  const { email } = req.body;

  const userFound = await User.findOne({ email: email });

  if (!userFound) {
    return res.status(409).json({
      message: "We couldn't find any user with this email",
    });
  }

  await sendEmailRecovery({
    email,
    subject: "Reset password request 🔒",
    body: `<!DOCTYPE html>
<html>

<head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <style type="text/css">
        /* FONTS */
        @import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@700&display=swap");

        * {
            font-family: "Nunito Sans", sans-serif;
        }

        /* CLIENT-SPECIFIC STYLES */
        body,
        table,
        td,
        a {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        table,
        td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        img {
            -ms-interpolation-mode: bicubic;
        }

        /* RESET STYLES */
        img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }

        table {
            border-collapse: collapse !important;
        }

        body {
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
        }

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
        @media screen and (max-width:600px) {
            h1 {
                font-size: 32px !important;
                line-height: 32px !important;
            }
        }

        /* ANDROID CENTER FIX */
        div[style*="margin: 16px 0;"] {
            margin: 0 !important;
        }
    </style>
</head>

<body style="background-color: #eaeaea; margin: 0 !important; padding: 0 !important;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tbody>
            <tr>
                <td bgcolor="#3d424a" align="center">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tbody>
                            <tr>
                                <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"></td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td bgcolor="#3d424a" align="center" style="padding: 0px 10px 0px 10px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tbody>
                            <tr>
                                <td bgcolor="#ffffff" style="
                  padding: 20px 30px;
                  font-family: 'Nunito Sans', sans-serif;
                ">
                                    <div style="width: fit-content"><a style="text-decoration: none" href="${process.env.URL_SERVER}:${process.env.PORT_SERVER_FRONT}/" target="_blank"><img src="https://res.cloudinary.com/dvqlenul5/image/upload/v1664553256/Logo-word_wlz74m.png" alt="Logo" title="Logo" style="width: 200px"></a></div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tbody>
                            <tr>
                                <td style="padding: 20px 50px" bgcolor="#ffffff">
                                    <div style="
                    height: 1px;
                    background-color: #a4a4a4;
                    line-height: 1px;
                  "></div>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" style="max-width:600px; padding: 0px 30px 0px 30px; font-family:'Nunito Sans', sans-serif; font-weight: 400" class="esd-text">
                                    <h1 style="font-size:24px; margin:0px; color: #3d424a">Reset your Mejor Postor password</h1>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" style="display: flex; flex-direction:column; align-items:left; padding: 0px 30px 0px 30px; color: #666666; font-family:'Nunito Sans', sans-serif; font-weight: 400" class="esd-text">
                                    <h5 style="margin:30px 0px 10px">Hello there,</h5>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" style="display: flex; flex-direction:column; align-items:left; padding: 0px 30px 0px 30px; color: #666666; font-family:'Nunito Sans', sans-serif; font-weight: 400" class="esd-text">
                                    <h5 style="margin:10px 0px 30px">Someone has requested a link to change your password. You can do this through the link below.</h5>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left">
                                    <table border="0" cellspacing="0" cellpadding="0">
                                        <tbody>
                                            <tr>
                                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px;">
                                                    <table border="0" cellspacing="0" cellpadding="0">
                                                        <tbody>
                                                            <tr>
                                                                <td align="left" style="border-radius: 10px;" bgcolor="#feae49"><a href="${process.env.URL_SERVER}:${process.env.PORT_SERVER_FRONT}/api/auth/verify/" target="_blank" style="font-size: 14px; font-family:'Nunito Sans', sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 10px 25px; display: inline-block;">Change my password</a></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 32px 50px" bgcolor="#ffffff">
                                    <div style="height:1px; background-color:#a4a4a4; line-height:1px" class="esd-text">‌</div>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" style="max-width:600px; padding: 0px 30px 20px 30px; color: #666666; font-family:'Nunito Sans', sans-serif; font-weight: 400" class="esd-text">
                                    <h5 style="margin: 0;">If you didn't request this, please ignore this email.</h5>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" style="max-width:600px; padding: 0px 30px 20px 30px; color: #666666; font-family:'Nunito Sans', sans-serif; font-weight: 400" class="esd-text">
                                    <h5 style="margin: 0;">Your password won't change until you access the link above and create a new one.</h5>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#C2C2C2" align="center" style="padding: 20px 30px 15px 30px; color: #666666; font-family:'Nunito Sans', sans-serif; font-size: 12px" class="esd-text">
                                    <p style="margin: 0; font-weight:700">You received this email because you've signed up to Mejor Postor</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#C2C2C2" align="center" style="padding: 0px 30px 15px 30px; color: #666666; font-family:'Nunito Sans', sans-serif; font-size: 12px" class="esd-text">
                                    <p style="margin: 0; font-weight:700">Copyright © 2022 Mejor Postor</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#C2C2C2" align="center" style=" padding: 0px 30px 20px 30px; color: #666666;font-family:'Nunito Sans', sans-serif; font-size: 12px; font-weight:700" class="esd-text">
                                    <p style="margin: 0;">All rights reserved</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</body>

</html>
`,
  });
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await User.findOne({ email: email }).populate("roles");

    if (!userFound) return res.status(406).json({ message: "User not found" });

    if (!userFound.enabled)
      return res.status(401).json({
        message: "Email hasn't been verified yet. Please, check your inbox.",
      });

    const matchPassword = await User.comparePassword(
      password,
      userFound.password
    );

    if (!matchPassword)
      return res.status(401).json({ token: null, message: "Invalid password" });

    const payload = {
      id: userFound._id,
      username: userFound.username,
      roles: userFound.roles[0].name,
      email: userFound.email,
      image: userFound.image,
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
    const { _id: userId, uniqueString } = req.params;

    const userFound = await UserVerification.findOne({ userId });

    if (!userFound) {
      return res.status(409).json({
        message:
          "The verification token is invalid or has already been used. Please retry the flow",
      });
    } else {
      const { expiresAt } = userFound;
      if (expiresAt < Date.now()) {
        await UserVerification.deleteOne({ userId });

        await User.deleteOne({ userId });

        return res.status(409).json({
          message:
            "The verification token is invalid or has already been used. Please retry the flow",
        });
      } else {
        const userCheck = await UserVerification.compareUniqueStrings(
          uniqueString,
          userFound.uniqueString
        );

        if (userCheck) {
          await User.updateOne({ userId }, { $set: { enabled: true } });
          await UserVerification.deleteOne({ userId });
        }
      }
    }

    await User.updateOne({ _id: userId }, { $set: { enabled: true } });
    res.status(200).json({ message: "Email verified successfully" });
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

  const userFound = await User.findOne({ username, id }).populate("roles");

  const payload = {
    id: id,
    username: username,
    // roles: userFound.roles[0].name,
    email: userFound.email,
    image: userFound.image,
  };

  const token = jwt.sign(payload, privateKey, jwtOptions);

  res.json({
    token: token,
    payload: payload,
    message: "User signed in successfully",
  });
};

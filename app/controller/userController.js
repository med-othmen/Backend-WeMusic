var sql = require("../Model/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
("use strict");
const nodemailer = require("nodemailer");

//get all users request

exports.getall = function (req, res) {
  sql.query("select * from user", function (err, data) {
    if (err) {
      res.send({
        ok: false,
        text: "error",
      });
    } else {
      res.send({
        ok: true,
        users: data,
      });
    }
  });
};

// registre request
exports.registre = async function (req, res) {
  const password = req.body.password;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  // setup email

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "wemusic691@gmail.com",
      pass: "passw0rd09:)", // naturally, replace both with your real credentials or an application-specific password
    },
  });

  const mailOptions = {
    from: "wemusic691@gmail.com",
    to: req.body.email,
    subject: "Inscription We Music",
    html:
      "<h1>Bienvenue sur We Music.<br/> Votre nouveau compte vous donne accès aux produits et services We Music.</h1>",
  };

  sql.query(
    "select * from user where email= ?",
    req.body.email,
    function (err, data) {
      if (err) {
        res.send({
          ok: false,
          text: "error",
        });
      } else if (data.length > 0)
        res.send({
          ok: false,
          text: "user already exist",
        });
      else {
        sql.query(
          "INSERT INTO user (nom, prenom,email,password,telephone,picture,active,role ) VALUES (?,?,?,?,?,?,?,?)",
          [req.body.name, "", req.body.email, encryptedPassword, 0, "", 1,req.body.role],
          function (err, data) {
            if (err) {
              console.log(err);
              res.send({
                ok: false,
                text: "error",
              });
            } else {
              res.send({
                ok: true,
                text: [
                  req.body.name,
                  "",
                  req.body.email,
                  req.body.password,
                  0,
                  "",
                  1,
                ],
              });

              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Email sent: " + info.response);
                }
              });
            }
          }
        );
      }
    }
  );
};

// login request
exports.login = async function (req, res) {
  const { email, password } = req.body;
  console.log(req.body.email, password);

  sql.query(
    "SELECT * from user where email = ?",
    email,
    async function (err, data) {
 
      if (err) {
        res.send({
          ok: false,
          text: "error",
        });
      } else if (data.length > 0) {
        const comparison = await bcrypt.compare(password, data[0].password);
        console.log(comparison);
        if (comparison) {
          var token = jwt.sign(
            {
              client: data[0],
            },
            "JWT_SECRET"
          );

          res
            .cookie("token", token, {
              maxAge: 900000,
            })
            .send({
              ok: true,
              text: data[0],
            });
        }
      } else {
        res.send({
          ok: false,
          text: "user not found",
        });
      }
    }
  );
};

// update request
exports.update = async function (req, res) {
  const password = req.body.password;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  var user = [
    req.body.nom,
    req.body.prenom,
    req.body.email,
    encryptedPassword,
    Number(req.body.telephone),
    req.body.picture,
    Number(req.body.active),
    Number(req.body.id),
  ];
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "wemusic691@gmail.com",
      pass: "passw0rd09:)", // naturally, replace both with your real credentials or an application-specific password
    },
  });

  const mailOptions = {
    from: "wemusic691@gmail.com",
    to: req.body.email,
    subject: "Alert mise a jour de votre compte  We Music",
    html:
      "<h1>vous avez mis a jour votre profil ajourd'hui a xx:xx le 26/04/2021</h1>",
      
  };

  sql.query(
    `UPDATE user SET nom = ?,prenom= ?,email = ?,password = ?,telephone = ?,picture = ?,active = ? WHERE id = ?`,
    user,
    function (err, data) {
      if (err) {
        console.log(err);
        res.send({
          ok: false,
          text: err,
        });
      } else {
        res.send({
          ok: true,
          text: {
            id: req.body.id,
            prenom: req.body.prenom,
            nom: req.body.nom,
            email: req.body.email,
            telephone: req.body.telephone,
            active: req.body.active,
            id: req.body.id,
            picture: req.body.picture,
          },
        });
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
      }
    }
  );
};

exports.currentuser = function (req, res) {
  console.log(req.params.id);
  sql.query(
    "SELECT * FROM user WHERE id = ?",
    req.params.id,
    function (err, data) {
      console.log(data.length);
      if (err) {
        return res.send({
          ok: false,
          text: "error",
        });
      } else if (data.length > 0) {
        return res.send({
          ok: true,
          text: data,
        });
      } else {
        return res.send({
          ok: false,
          text: "user not found",
        });
      }
    }
  );
};


/*
SELECT C.id,C.nom,C.prenom,C.email,C.password,C.telephone,C.picture,C.active,AD.nom_complet,AD.numero_nom_rue,AD.complement,AD.code_postal,AD.ville from user as C JOIN adress as AD ON AD.client_id=C.id where C.email = ? */
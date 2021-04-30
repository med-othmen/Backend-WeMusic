var sql = require("../Model/db");

exports.add = async function (req, res) {
  sql.query(
    "select * from adress where client_id = ?",
    req.body.client_id,
    function (err, data) {
      console.log(data.length);
      if (err) {
        res.send({ ok: false, text: err });
      } else {
        if (data.length === 0) {
          sql.query(
            "INSERT INTO adress (nom_complet, numero_nom_rue,complement,code_postal,ville ,client_id) VALUES (?,?,?,?,?,?)",
            [
              req.body.nom_complet,
              req.body.numero_nom_rue,
              req.body.complement,
              req.body.code_postal,
              req.body.ville,
              req.body.client_id,
            ],
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
                  text: data,
                });
              }
            }
          );
        } else {
          sql.query(
            "UPDATE adress SET nom_complet = ? ,numero_nom_rue = ? ,complement = ? ,code_postal = ? ,ville = ? , client_id = ?  WHERE client_id =  ? ",
            [
              req.body.nom_complet,
              req.body.numero_nom_rue,
              req.body.complement,
              req.body.code_postal,
              req.body.ville,
              req.body.client_id,
              req.body.client_id,
            ],
            function (err, data) {
              if (err) {
                res.send({
                  ok: false,
                  text: "errdddor",
                });
              } else {
                res.send({
                  ok: true,
                  adress:"pass",
                });
              }
            }
          );
        }
      }
    }
  );
};

exports.getone = function (req, res) {
  sql.query(
    "SELECT * from adress where client_id = ?",
    req.params.id,
    function (err, data) {
      if (err) {
        res.send({
          ok: false,
          text: "error",
        });
      } else {
        res.send({
          ok: true,
          adress: data[0],
        });
      }
    }
  );
};

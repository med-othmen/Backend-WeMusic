var sql = require("../Model/db");
const jwt = require("jsonwebtoken");

// registre request
exports.registre = function (req, res) {

  var post = [
    req.body.name,
    'prenomA',
  req.body.email,
  req.body.password
  ];


  sql.query("select * from client where email= ?", req.body.email, function (err, data) {
    if (err) {
      res.send({
        ok: false,
        text: "error"
      });
    } else if(data.length>0)
     res.send({
      ok: false,
      text: 'user already exist'
    });
    else {
      sql.query("INSERT INTO client (nom, prenom,email,password,telephone,picture,active ) VALUES (?,?,?,?,?,?,?)",[req.body.name,'',req.body.email,req.body.password,0,'',1], function (err, data) {
        if (err) {
          console.log(err)
          res.send({
            ok: false,
            text: "error"
          });
        } else {res.send({
          ok: true,
          text: [req.body.name,'',req.body.email,req.body.password,0,'',1]
        });console.log(data)}
    
      });
    }

  });

  

}

// login request 
exports.login = function (req, res) {
  const {
    email,
    password
  } = req.body;
  sql.query("SELECT * FROM client WHERE email = ? AND password = ?", [email, password], function (err, data) {
    console.log(data)
    if (err) {
      res.send({
        ok: false,
        text: "error"
      });

    } else if (data.length>0 ) {

      var token = jwt.sign({
        client: data[0]
      }, 'JWT_SECRET');

      res
        .cookie("token", token, {
          maxAge: 900000
        })
        .send({
          ok: true,
          text: data[0]
        });

    } else {
      res.send({
        ok: false,
        text: "user not found"
      });
    }


  });

}


// update request 
exports.update = function (req, res) {
  var user = [
    req.body.nom,
req.body.prenom,
  req.body.email,
  req.body.password,
  Number(req.body.telephone),
  req.body.picture,
  Number(req.body.active),
  Number(req.body.id)
  ];
 
  sql.query(`UPDATE client SET nom = ?,prenom= ?,email = ?,password = ?,telephone = ?,picture = ?,active = ? WHERE id = ?`,user, function (err, data) {
    if (err) {
     console.log(err)
      res.send({
        ok: false,
        text: err
      });
    } else {res.send({
      ok: true,
      text: {id:req.body.id,
      prenom:req.body.prenom,
      nom : req.body.nom,
      email:req.body.email,
      telephone:req.body.telephone,
      active:req.body.active,
      id:req.body.id,
      picture:req.body.picture
    
    }
    });console.log(user)}

  
  });


}

exports.currentuser =function(req,res){
  console.log(req.params.id)
  sql.query("SELECT * FROM user WHERE id = ?",req.params.id, function (err, data) {
    console.log(data.length)
    if (err) {
    return  res.send({
        ok: false,
        text: "error"
      });

    } else if(data.length>0) {
    return  res.send({
        ok: true,
        text: data
      });
    }else{
      return  res.send({
        ok: false,
        text: "user not found"
      });
    }
 

  });
}
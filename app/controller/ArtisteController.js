var sql = require("../Model/db");


// registre request
exports.getall = function (req, res) {

  sql.query("SELECT  * from artiste ",  function (err, data) {    if (err) {
      res.send({
        ok: false,
        text: "error"
      });
    } 
    else {
      res.send({
        ok: true,
        artistes: data
      });
    
    }
  });

}

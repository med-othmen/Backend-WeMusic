var sql = require("../Model/db");


// registre request
exports.getall = function (req, res) {

  sql.query("SELECT  * from type  limit 10 ",  function (err, data) {    if (err) {
      res.send({
        ok: false,
        text: "error"
      });
    } 
    else {
      res.send({
        ok: true,
        types: data
      });
    
    }
  });

}

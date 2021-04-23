var sql = require("../Model/db");


// registre request
exports.getall = function (req, res) {

  sql.query("SELECT P.id, P.title,P.picture,P.description,P.first_price,P.promo_price,P.media_home,T.libelle as type, SC.libelle as sleeve_condition,G.libelle as genre,A.nom as artiste,MC.libelle as media_condition FROM produit AS P JOIN media_condition as MC  ON P.media_condition_id=MC.id JOIN sleeve_condition as SC ON P.media_condition_id=SC.id JOIN type as T ON  P.type_id=T.id JOIN  genre as G ON P.genre_id=G.id JOIN artiste as A ON P.artiste_id=A.id",  function (err, data) {    if (err) {
      res.send({
        ok: false,
        text: "error"
      });
    } 
    else {
      res.send({
        ok: true,
        products: data
      });
    }
  });

}

var sql = require("./db.js");

//Product object constructor
class Product {
  constructor(product) {
    this.id = product.id;
    this.title = product.title;
    this.picture = product.picture;
    this.description = product.description;
    this.first_price = product.first_price;
    this.promo_price = product.promo_price;
    this.media_home = product.media_home;
    this.genre_id = product.genre_id;
    this.sleeve_condition_id = product.sleeve_condition_id;
    this.media_condition_id = product.media_condition_id;
    this.type_id = product.type_id;
    this.artiste_id = product.artiste_id;

  }
}

module.exports = Product;

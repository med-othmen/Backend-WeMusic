var mysql = require("mysql");

//local mysql db connection
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "we_music_finale",
});

connection.connect(function (err) {
  if (!err) {
    console.log("Database WE MUSIC is connected");
  } else {
    console.log("Error while connecting with database");
  }
});

module.exports = connection;

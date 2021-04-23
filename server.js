const express = require("express"),
  bodyParser = require("body-parser");
var port = 2000;
var app = express();
var cors = require("cors");
// body parser for json form all data recived from response
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

const cookieParser = require("cookie-parser");
app.use(cookieParser());

// connexion au server
app.listen(port, (err) => {
  if (err) {
    console.log("Error when running the server");
  } else {
    console.log(`Server running on port ${port}`);
  }
});

//importing route product
var product = require("./app/Routes/ProductRouter.js");
var user = require("./app/Routes/UserRouter.js")
var type =require ("./app/Routes/Types_prodRouter")
var genre=require("./app/Routes/Genre_prodRouter")
var sleeve_condition=require("./app/Routes/Sleeve_conditionRouter")
var artiste=require("./app/Routes/ArtisteRouter")
var article=require("./app/Routes/ArticleRouter")
// Use routers
app.use("/product", product);
app.use('/user',user);
app.use('/data/types/',type)
app.use('/data/genres/',genre)
app.use('/data/sleeve_condition/',sleeve_condition)
app.use('/data/artistes/',artiste)
app.use('/data/articles/',article)

app.get("/private", (req, res) => {
  if (!req.cookies.token) return res.status(401).send();
  res.send(req.coockies.token);
});

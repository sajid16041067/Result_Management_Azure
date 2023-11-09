const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
server.set("view engine", "ejs");
server.use(bodyParser.urlencoded({ extended: true }));
const session = require("express-session");
const cookieParser = require("cookie-parser");
const sequelize=require("sequelize");
const db=require("./db/connection");

server.use(cookieParser());
server.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "secret",
  })
);
// database connection
require("./db/connection");
db.sync();






server.use("/auth", require("./routes/auth"));
server.use("/teacher", require("./routes/teacher"));
server.use("/student", require("./routes/student"));
server.use("/", (req, res) => {
  res.render("index");
});

server.listen(PORT, () => {
  console.log("Server is running on PORT "+PORT);
});

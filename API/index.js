const express = require('express'); 
const mysql = require('mysql');
// const route = require("./routes");
// const cookieParser = require("cookie-parser");
// const dotenv = require("dotenv");
// const session = require("express-session");
// const MemoryStore = require("memorystore")(session);
// const passport = require("passport");
// require("./utils/googleAuth");

// const rateLimit = require("express-rate-limit");
// const helmet = require("helmet");
// const cors = require("cors");
// const xss = require("xss-clean");
// const hsts = require("hsts");

const app = express(); 
require("dotenv").config();
const port = 8080; 
// var con = mysql.createConnection({
//     host: "14.225.254.7",
//     user: "administrator",
//     password: "Vuhanh@1897!"
// });
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
app.get('/', function(req, res){
    res.send("Hello World");
})

app.listen(port, function(){
    console.log("Your app running on port " + port);
})
var express = require('express');
var todocontroller = require('./controllers/todocontroller.js');

var app = express();

var up9Monitor = require("up9-node")({
  "up9Server": "up9.app",
  "serviceName": "billock.todo.list",
  "clientId": "7AA7oJD1Iv2GXzx_3OyOH3mhOrQPRBqc",
  "clientSecret": "aXxQ_KBT7yuzFQffXjpvlnBw5s_sIvfl",
  "hostnameOverrides": {"https://your-external-dns-address": "your-service-name"}
});



// Set up template engine
app.set('view engine', 'ejs');

// Static files
app.use(express.static('./public'));
app.use(up9Monitor.express());

// Fire controllers
todocontroller(app);

// Listen to port
app.listen(3000);
console.log("Your Listening to the port 3000")

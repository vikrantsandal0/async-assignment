
var express = require('express');
 var   app = express();
 global.app = app;
   var   server = require('http').createServer(app);
   var  dba = require('./connect2.js');
    require('./user');
   
let port = 2000;

server.listen(port, function () {
  console.log('server has started');
});
















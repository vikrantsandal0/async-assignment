
const express = require('express');
 const   app = express();
 global.app = app;
   const   server = require('http').createServer(app);
   const  dba = require('./connect2.js');
    require('./user');
   
let port = 2000;

server.listen(port, function () {
  console.log('server has started');
});
















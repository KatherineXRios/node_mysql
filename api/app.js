const express = require ('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
var mysql      = require('mysql');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev')); //To see the version used
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>Test node-mysql </h1></body></html>')
})

const con = mysql.createConnection({
  host     : 'localhost',
  user     : 'me',
  password : 'secret',
  database : 'mydb'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE mydb", function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });
  });

const server = http.createServer(app)

server.listen( port, hostname, () => {
    console.log (`The server runs on http://${hostname}:${port} /`);
})
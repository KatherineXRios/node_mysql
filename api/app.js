const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;
const test = require('./Routes/test');

const app = express();

app.use(morgan('dev')); //To see the version used
app.use(bodyParser.json());

app.use('/test', test);

app.use((req, res, next) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>Test node-mysql </h1></body></html>');
});


const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`The server runs on http://${hostname}:${port} /`);
});
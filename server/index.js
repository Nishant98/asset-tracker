const express = require('express');
const http = require('http');
// const bodyParser = require('body-parser');
const cors = require('cors');

const orderRouter = require('./routes/orderRouter');
const web3 = require('./configuration/blockchain.js');

const hostname = 'localhost';
const port = 3001;

const app = express();

app.use(
    cors({
        origin: [/localhost/],
        optionsSuccessStatus: 200,
        methods: ['POST', 'PUT', 'PATCH', 'GET', 'OPTIONS', 'HEAD', 'DELETE'],
        allowedHeaders: ['Content-Type', 'authorization', 'cookie', 'refresh', 'CSRF-Token'],
        exposedHeaders: ['csrf-token'],
        credentials: true,
    })
);
// app.use(bodyParser.json());

// mount
app.use('/order', orderRouter);

// next calls the later routes (depending on the req method) to perform the action
app.use((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

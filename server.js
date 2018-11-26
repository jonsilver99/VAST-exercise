const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')
const dbConnection = require('./db/connection')
const vastsRouter = require('./routers/vastRouter')
const PORT = process.env.PORT || 4200;

const server = express();
dbConnection.connect();

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())
server.use("/", express.static(__dirname + "/build/"));

// load website
server.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

// route vast requests 
server.use('/vasts', vastsRouter)

server.listen(PORT, () => console.log(`listening on port ${PORT}`))
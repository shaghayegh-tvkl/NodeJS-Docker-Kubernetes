const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
global.config = require("./app/config");

const routeHandler = require('./app/routes/index');

const mongoDatabase = require(`${config.path.database}/ShaghayeghDB`);
const mongoDatabaseObj = new mongoDatabase();
mongoDatabaseObj.connectToDatabase();

const redisDatabase = require(`${config.path.database}/RedisDB`);
const redisDatabaseObj = new redisDatabase();
redisDatabaseObj.connectToDatabase();

app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "O.rigin, X-Requested-With, Content-Type, Accept,x-access-token", "Authorization", "X-Requested-With"
    );

    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", routeHandler);

app.get('/', (req, res) => {
    res.send('');
});


var filePath = "./app/shaghayegh.html"
var resolvedPath = path.resolve(filePath);

app.get('/hello', (req, res) => {
    return res.sendFile(resolvedPath);
});

app.all("*", (req, res) => {
    return res.status(404).json({
        success: false,
        msg: "404 Error - Not Found"
    });
});


app.listen(config.port, config.ip, () => {
    console.log(`Server is running on ${config.ip}:${config.port}`)
})

var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var url = `mongodb://${config.database.ShaghayeghDB.host}:${config.database.ShaghayeghDB.port}/`;
var log4js = require('log4js')
var logger = log4js.getLogger()
var promise = require('promise')

var state = {
    database: null,
    db: null
}

module.exports = class Microhosting_db {
    constructor() { }

    async connectToDatabase() {
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, dbInstance) {
            if (err) {
            //    logger.error('Error - Connecting to MongoDB')
                console.log('Error - Connecting to MongoDB')
            }
            else {
                state.database = dbInstance.db("ShaghayeghDB");
            //    logger.info('Connected to MongoDB')
                console.log('Connected to MongoDB')
            }
        });
    }


    async insertIntoDatabase(collectionName, data) {
        return new promise((res, rej) => {
            state.database.collection(collectionName).insertOne(data, (error, response) => {
                if (error) rej(error);
                else res(response);
            });
        });
    }


    async findInDatabase(collectionName, data) {
        return new promise((res, rej) => {
            state.database.collection(collectionName).find(data).toArray((error, result) => {
                if (error) rej(error);
                else res(result);
            });
        });
    }

}

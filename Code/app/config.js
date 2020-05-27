var path = require('path');

module.exports = {

    ip: '0.0.0.0',
    port: '3000',

    path: {
        controllers: path.resolve('./app/controllers'),
        model: path.resolve('./app/models'),
        database: path.resolve('./app/database'),
    },

    database: {
        ShaghayeghDB: {
            database: 'ShaghayeghDB',
            host: process.env.MONGO_IP,
            //host: '192.168.1.57',
            //host: '172.17.0.2',
            port: '27017'
        },
    RedisDB: {
        database: 'CacheDB',
            host: process.env.MONGO_IP,
            //host: '192.168.1.57',
            //host: '172.17.0.2',
            port: '6369'           
        }
    }

};

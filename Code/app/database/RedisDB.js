var redis = require("redis");
var client = redis.createClient(config.database.RedisDB.port, config.database.RedisDB.host);
var log4js = require('log4js')
var logger = log4js.getLogger()

module.exports = class cache_db {

    async connectToDatabase() {

        client.on('connect', function () {
            //logger.info("Connected to Redis")
            console.log("Connected to Redis")
        }).on('error', function (error) {
            //logger.error("Error Connecting to Redis");
            console.log("Error Connecting to Redis");
        });
    }



    cacheData(index, key, value, callback) {
        client.select(index, add => {
            client.hmset(key, value, (error) => { return callback(error) });
        })
    }

    cacheDataExpire(index, key, value, callback) {
        client.select(index, add => {
            client.hmset(key, value, (error) => { return callback(error) });
            client.expire(key, 180)
        })
    }

    getData(index, key, callback) {
        client.select(index, get => {
            client.hgetall(key, function (error, results) {
                if (error) {
                    callback(error)
                } else {
                    callback(results)
                }
            })
        })
    }

    getKeys(index, callback) {
        client.select(index, get => {
            client.keys('*', (error, results) => {
                if (error) {
                    callback(error)
                }
                else {
                    callback(results)
                }
            })
        })
    }

    updateData(index, key, value, callback) {
        client.select(index, get => {
            client.hmset(key, value, (error) => {
                return callback(error)
            });
        })
    }

    deleteData(index, key, callback) {
        client.select(index, (err, res) => {
            client.keys('*', (err, results) => {
                client.del(key, error => {
                    callback(error)
                })
            })

        })
    }

}

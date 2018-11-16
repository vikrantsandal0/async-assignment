const MongoClient = require('mongodb').MongoClient;
var schema = require('./models');

async function connect() {
    try {
        MongoClient.connect("mongodb://localhost:27017", function (err, client) {

            global.dba = client.db('connecto');
            console.log("connected to mongo");
            schema.user.userSchema();
            console.log("schema connected");

        });

    } catch (err) {

        return err

    }

}

connect();
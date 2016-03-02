'use strict';

var mongoClient = require('mongodb').MongoClient;

module.exports = {

    server: function (url) {
        this.url = url;
        return this;
    },

    collection: function (collectionName) {
        this.collectionName = collectionName;
        return this;
    },

    where: function (fieldName) {
        this.fieldName = fieldName;
    },

    insert: function (elem, callback) {
        var collectionName = this.collectName;
        mongoClient.connect(this.url, function (err, db) {
            if (err) {
                console.error(err);
            } else {
                var collection = db.collection(collectionName);
                collection.insert(elem, function (err, result) {
                    callback(err, result);
                    db.close();
                });
            }
        });
    }
}
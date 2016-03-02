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

    where: function (columnName) {
        this.columnName = columnName;

        return this;
    },

    not: function () {
        this.isNot = true;

        return this;
    },

    equal: function (queryString) {
        var tempObj = {};

        if (this.isNot !== true) {
            tempObj[this.columnName] = { $eq: queryString };
        } else {
            tempObj[this.columnName] = { $ne: queryString };
            this.isNot = false;
        }

        this.query = tempObj;

        return this;
    },

    lessThan: function (queryString) {
        var tempObj = {};

        if (this.isNot !== true) {
            tempObj[this.columnName] = { $lt: queryString };
        } else {
            tempObj[this.columnName] = { $gte: queryString };
            this.isNot = false;
        }

        this.query = tempObj;

        return this;
    },

    greatThan: function (queryString) {
        var tempObj = {};

        if (this.isNot !== true) {
            tempObj[this.columnName] = { $gt: queryString };
        } else {
            tempObj[this.columnName] = { $lte: queryString };
            this.isNot = false;
        }

        this.query = tempObj;

        return this;
    },

    include: function (queryString) {
        var tempObj = {};

        if (this.isNot !== true) {
            tempObj[this.columnName] = { $in: queryString };
        } else {
            tempObj[this.columnName] = { $nin: queryString };
            this.isNot = false;
        }

        this.query = tempObj;

        return this;
    },

    find: function (callback) {
        var collectionName = this.collectionName;
        var query = this.query;

        mongoClient.connect(this.url, function (err, db) {
            if (err) {
                console.error(err);
            } else {
                var collection = db.collection(collectionName);

                var result = collection.find(query).toArray(function (err, result) {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        callback(null, result);
                        db.close();
                    }
                });
            }
        });
    },

    insert: function (elem, callback) {
        var collectionName = this.collectionName;

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
};

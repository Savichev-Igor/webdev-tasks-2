'use strict';

// Драйвер для работы с mongodb
var mongoClient = require('mongodb').MongoClient;

/**
 * Создаёт экземпляр мультиварки.
 * @constructor
 */
module.exports = function Multivarka() {

    /**
     * Функция устанавливает адрес сервера базы данных.
     * @param {string} url
     * @returns this
     */
    this.server = function (url) {
        this._url = url;

        return this;
    };

    /**
     * Функция устанавливает имя коллекции.
     * @param {string} collectionName
     * @returns this
     */
    this.collection = function (collectionName) {
        this._collectionName = collectionName;

        return this;
    };

    /**
     * Функция устанавливает название колонки, которое будет использоваться в запросе.
     * @param {string} columnName
     * @returns this
     */
    this.where = function (columnName) {
        this._columnName = columnName;

        return this;
    };

    /**
     * Функция просто меняет состояние объекта, устанавливая флажок isNot.
     * @returns this
     */
    this.not = function () {
        this._isNot = true;

        return this;
    };

    /**
     * Функция устанавливает операцию 'равенства'/'неравенства' для запроса.
     * @param {string} queryString
     * @returns this
     */
    this.equal = function (queryString) {
        var tempObj = {};
        var operation;

        if (this._isNot) {
            operation = '$ne';
            this._isNot = false;
        } else {
            operation = '$eq';
        }

        tempObj[this._columnName] = { [operation]: queryString };
        this._query = tempObj;

        return this;
    };

    /**
     * Функция устанавливает операцию 'меньше чем'/'больше чем' для запроса.
     * @param {string} queryString
     * @returns this
     */
    this.lessThan = function (queryString) {
        var tempObj = {};
        var operation;

        if (this._isNot) {
            operation = '$gte';
            this._isNot = false;
        } else {
            operation = '$lt';
        }

        tempObj[this._columnName] = { [operation]: queryString };
        this._query = tempObj;

        return this;
    };

    /**
     * Функция устанавливает операцию 'больше чем'/'меньше чем' для запроса.
     * @param {string} queryString
     * @returns this
     */
    this.greatThan = function (queryString) {
        var tempObj = {};
        var operation;

        if (this._isNot) {
            operation = '$lte';
            this._isNot = false;
        } else {
            operation = '$gt';
        }

        tempObj[this._columnName] = { [operation]: queryString };
        this._query = tempObj;

        return this;
    };


    /**
     * Функция которая устанавливает операцию 'содержится'/'не содержится' для запроса.
     * @param {string} queryString
     * @returns this
     */
    this.include = function (queryString) {
        var tempObj = {};
        var operation;

        if (this._isNot) {
            operation = '$nin';
            this._isNot = false;
        } else {
            operation = '$in';
        }

        tempObj[this._columnName] = { [operation]: queryString };
        this._query = tempObj;

        return this;
    };

    /**
     * Функция, которая делает запрос к базе данных.
     * @param {Function} callback
     */
    this.find = function (callback) {
        var collectionName = this._collectionName;
        var query = this._query;

        mongoClient.connect(this._url, function (err, db) {
            if (err) {
                console.error(err);
            } else {
                db
                .collection(collectionName)
                .find(query)
                .toArray(function (err, result) {
                    if (err) {
                        console.error(err);
                        db.close();
                    } else {
                        callback(null, result);
                        db.close();
                    }
                });
            }
        });
    };

    /**
     * Очищает коллекцию в базе данных.
     * @param {Function} callback
     */
    this.remove = function (callback) {
        var collectionName = this._collectionName;

        mongoClient.connect(this._url, function (err, db) {
            if (err) {
                console.error(err);
            } else {
                db
                .collection(collectionName)
                .drop(function (err, response) {
                    callback(err, response);
                    db.close();
                });
            }
        });
    };

    /**
     * Функция устанавливает обновляемое поле и значение.
     * @param {string} columnName
     * @param {string} newValue
     * @returns this
     */
    this.set = function (columnName, newValue) {
        this._updatedField = { $set: { [columnName]: newValue } };

        return this;
    };

    /**
     * Обновляет данные в базе данных.
     * @param {Function} callback
     */
    this.update = function (callback) {
        var collectionName = this._collectionName;
        var query = this._query;
        var updatedField = this._updatedField;

        mongoClient.connect(this._url, function (err, db) {
            if (err) {
                console.error(err);
            } else {
                db
                .collection(collectionName)
                .update(query, updatedField, function (err, response) {
                    callback(err, response);
                    db.close();
                });
            }
        });
    };

    /**
     * Функция вставляет элемент в базу данных.
     * @param {Object} elem
     * @param {Function} callback
     */
    this.insert = function (elem, callback) {
        var collectionName = this._collectionName;

        mongoClient.connect(this._url, function (err, db) {
            if (err) {
                console.error(err);
            } else {
                db
                .collection(collectionName)
                .insert(elem, function (err, response) {
                    callback(err, response);
                    db.close();
                });
            }
        });
    };
};

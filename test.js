'use strict';

const multivarka = require('./multivarka');
const students = require('./students');

multivarka
     // Указываем url для подключения
    .server('mongodb://localhost/urfu-2015')

    // и коллекцию
    .collection('students')

    // Выбираем только те записи, в которых поле `group` равно значению «ПИ-301».
    .where('group').equal('ПИ-302')

    // После подготовки, делаем запрос
    .find(function (err, data) {
        if (!err) {
            console.log(data);
        }
    });

console.log('---');

multivarka
    // Указываем url для подключения
    .server('mongodb://localhost/urfu-2015')

    // и коллекцию
    .collection('students')

    // Выбираем только те записи, в которых поле `group` соответствует любому из значений массива.
    .where('group').include(['ПИ-302', 'КБ-301'])

    // После подготовки, делаем запрос
    .find(function (err, data) {
        if (!err) {
            console.log(data);
        }
    });

// Вставка

//multivarka
//    // Указываем url для подключения
//    .server('mongodb://localhost/urfu-2015')
//
//    // и коллекцию
//    .collection('students')
//
//    // После подготовки, делаем запрос
//    .insert(students.phedya, function (err, result) {
//        if (!err) {
//            console.log(result);
//        }
//    });
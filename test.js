'use strict';

const multivarka = require('./multivarka');
const students = require('./students');

var objF = new multivarka();

// equal тест (Остальные аналогично)

//objF.
//    // Указываем url для подключения
//    server('mongodb://localhost/urfu-2015')
//
//    // и коллекцию
//    .collection('students')
//
//    // Выбираем только те записи, в которых поле `group` равно значению «ПИ-302».
//    .where('group').equal('ПИ-302')
//
//    // После подготовки, делаем запрос
//    .find(function (err, data) {
//        if (!err) {
//            console.log(data);
//        }
//    });

// include test (Остальные аналогично)

objF
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

// update test

//objF.
//    // Указываем url для подключения
//    server('mongodb://localhost/urfu-2015')
//
//    // и коллекцию
//    .collection('students')
//
//    // Выбираем только те записи, в которых поле `name` равно значению «Пётр».
//    .where('name').equal('Пётр')
//
//    // Устанавливаем обновляемое значение
//    .set('grade', '2')
//
//    // Действуем
//    .update(function (err, response) {
//        if (!err) {
//            console.log(response);
//        }
//    });

// remove test

//objF.
//    // Указываем url для подключения
//    server('mongodb://localhost/urfu-2015')
//
//    // и коллекцию
//    .collection('students')
//
//    .remove(function (err, response) {
//        if (!err) {
//            console.log(response);
//        }
//    });

// insert test

function insTest(obj, url, collName, students) {
    students.forEach(function (student) {
        obj
        // Указываем url для подключения
        .server(url)

        // и коллекцию
        .collection(collName)

        // После подготовки, делаем запрос
        .insert(student, function (err, response) {
            if (!err) {
                console.log(response);
            }
        });
    });
}

var testStudents = [
    students.ivan,
    students.igor,
    students.petr,
    students.phedya
];

//insTest(objF, 'mongodb://localhost/urfu-2015', 'students', testStudents);
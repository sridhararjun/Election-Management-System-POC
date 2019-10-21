'use strict';

const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'parliament_election'
});

connection.connect((err) => {
    if(err){
        throw err;
    }
});

module.exports = connection;
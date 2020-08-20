const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./key');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
  if (err) {
    console.log('Error al conectar a la DB MYSQL');
    console.log(err);
  }

  if (connection) {
    return;
  }
});

pool.query = promisify(pool.query);

module.exports = pool;

const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'satti5488',
  database: 'node-complete',
});


exports.pool = pool.promise();
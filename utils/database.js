// const mysql = require('mysql2');

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: 'satti5488',
//   database: 'node-complete',
// });


// exports.pool = pool.promise();


const sequelize = require('sequelize');

const sequelizeInstance = new sequelize.Sequelize('node-complete', 'root', 'satti5488', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelizeInstance;
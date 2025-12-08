
// const database = require('../utils/database').pool;

// module.exports = class Product {
//   constructor(id, title, imageUrl, description, price) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }


//   save() {
//     database.execute("INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)",
//       [this.title, this.price, this.imageUrl, this.description]);
//   }

//   update() {
//     database.execute("UPDATE products SET title = ?, price = ?, imageUrl = ?, description = ? WHERE products.id = ?",
//       [this.title, this.price, this.imageUrl, this.description, this.id]);
//   }

//   static deleteById(id) {
//     database.execute("DELETE FROM products WHERE products.id = ?", [id]);
//   }

//   static fetchAll() {
//     return database.execute('SELECT * FROM products');
//   }

//   static findById(id) {
//     return database.execute('SELECT * FROM products WHERE products.id = ?', [id]);
//   }
// };

const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Product = sequelize.define('product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = Product;

const database = require('../utils/database').pool;

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  
  save() {
    database.execute("INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)",
      [this.title, this.price, this.imageUrl, this.description]);
  }

  static deleteById(id) {
    database.execute("DELETE FROM products WHERE products.id = ?", [id]);
  }

  static fetchAll() {
    return database.execute('SELECT * FROM products');
  }

  static findById(id) {
    return database.execute('SELECT * FROM products WHERE products.id = ?', [id]);
  }
};
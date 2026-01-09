const getDb = require('../utils/database').getDb;
const mongodb = require('mongodb');

class Product {
  constructor(title, imageUrl, description, price,_id,customerId) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this._id = _id;
    this.customerId = customerId;
  }


  save() {
  const db = getDb();
  let dbOp;

  if (this._id) {
    const productId = this._id;

    // remove _id from update object
    const { _id, ...productData } = this;

    dbOp = db.collection('products').updateOne(
      { _id: new mongodb.ObjectId(productId) },
      { $set: productData }
    );
  } else {
    dbOp = db.collection('products').insertOne(this);
  }

  return dbOp
    .then(result => {
      console.log('Product saved successfully');
      return result;
    })
    .catch(err => {
      console.log(err);
    });
}


  static fetchAll() {
    const db = getDb();
    return db.collection('products').find().toArray()
      .then(products => {
        console.log(products);
        return products;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findById(prodId) {
    console.log("prodId in model:", prodId);
    const db = getDb();
    return db.collection('products').find({ _id: new mongodb.ObjectId(prodId) }).next()
      .then(product => {
        console.log(product);
        return product;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static deleteById(prodId) {
    const db = getDb();
    return db.collection('products').deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then(result => {
        console.log('Product deleted');
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = Product;
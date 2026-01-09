const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;
//mongodb+srv://satish:<db_password>@cluster0.svmjbaj.mongodb.net/
const mongoConnect = (callback) => {
  MongoClient.connect('mongodb+srv://satish:5488@cluster0.svmjbaj.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0')
    .then(client => {
      console.log('Connected to MongoDB');
      _db = client.db();
      callback();

    })
    .catch(err => {
      console.log(err);
    });
}

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
}

exports.getDb = getDb;
exports.mongoConnect = mongoConnect;
const express = require('express');
const path = require('path');

const router = express.Router();

const products = [];

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/add-product',(req, res, next) => {
  res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
});

router.post('/product',(req, res, next) => {
  products.push({title: req.body.title});
  res.redirect('/');
});


exports.router = router;
exports.products = products;
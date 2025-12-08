const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

//const database = require('./utils/database').pool;

const sequelize = require('./utils/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cartItem');
const Orders = require('./models/order');
const OrderItem = require('./models/order-item');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const order = require('./models/order');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);


Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Orders.belongsTo(User);
User.hasMany(Orders);
Orders.belongsToMany(Product, { through: OrderItem });

sequelize
  .sync()
  .then(() => {
    return User.findByPk(1); // RETURN THIS PROMISE
  })
  .then(user => {
    if (!user) {
      return User.create({ 
        name: 'Default User', 
        email: 'default@example.com' 
      });
    }
    return user;
  })
  .then(user => {
    return user.createCart();     // <-- NOW user exists
  })
  .then(() => {
    console.log("🚀 DB Synced, User + Cart Created");
    app.listen(3000);
  })
  .catch(err => console.log(err));


const express = require('express');
const path = require('path');

const app = express();
const rootDir = require('./utils/pathutil');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

/** for using css files */
app.use(express.static(path.join(__dirname, 'public')));

/** for using routs */
app.use('/admin',adminRoutes.router);
app.use(shopRoutes);

/** handling 404 errors   */
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(rootDir,  'views', 'page-not-found.html'));
});

app.listen(3000);
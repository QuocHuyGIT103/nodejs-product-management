const express = require('express')
require('dotenv').config()

const app = express()
const port = process.env.PORT

const database = require('./config/database.js')
const systemConfig = require('./config/system.js')


database.connect();

const route = require('./routes/client/index.route');
const routeAdmin = require('./routes/admin/index.route');

app.set('view engine', 'pug');
app.set('views', './views');


//App locals variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static('public'));

route(app);
routeAdmin(app);


app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});
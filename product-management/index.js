const express = require('express')
const methodOverride = require('method-override')
require('dotenv').config()

const app = express()


// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'))


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
const express = require('express')
require('dotenv').config()

const app = express()
const port = process.env.PORT

const database = require('./config/database.js')

database.connect();

const route = require('./routes/client/index.route');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));

route(app);

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});
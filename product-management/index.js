const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
require("dotenv").config();

const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash");

const app = express();

// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride("_method"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//Flash
app.use(cookieParser("keyboard cat"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
//End Flash

//Tiny MCE
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);

const port = process.env.PORT;

const database = require("./config/database.js");
const systemConfig = require("./config/system.js");

database.connect();

const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");

app.set("view engine", "pug");
app.set("views", `${__dirname}/views`);

//App locals variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static(`${__dirname}/public`));

route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

const express = require('express');
const app = express();
const db = require('./config/mongoose-connection');
require('dotenv').config();
const expressSession = require("express-session");
const flash = require("connect-flash");

const cookieParser = require("cookie-parser");
const isLoggedin = require('./middlewares/isLoggedin')


const indexRouter = require("./routes/index")
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", 'ejs');


app.use(
    expressSession({
        resave: false,
        saveUninitialized: true,
        secret: process.env.EXPRESS_SESSION_SECRET
    })
);

app.use(flash());

app.use((req, res, next) => {
    res.locals.messages = req.flash();
    next();
});

//app.use(isLoggedin);


app.use('/', indexRouter);
app.use('/owners', ownersRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.listen(3000);
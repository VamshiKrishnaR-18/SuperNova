const express = require('express');
const app = express();

const db = require('./config/mongoose-connection');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");

app.get('/', (req, res) =>{
    res.send("hello");
})


app.use('/owners', ownersRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);


app.listen(3000);
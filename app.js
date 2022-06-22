const express = require('express')
const indexRouter = require('./routes/index')
const productRouter = require('./routes/product')
const orderRouter = require('./routes/order')
const path = require('path')
const db = require('./models/index');

const app = express()
app.use(express.json())

// Router
app.use(indexRouter);
app.use("/api/products",productRouter);
app.use("/api/orders",orderRouter);

// View engine
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs');


app.listen(3000, ()=> console.log ('Server is running on port 3000'))
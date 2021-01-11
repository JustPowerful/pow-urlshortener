const express = require('express')
const path = require('path')
require('dotenv').config()
const app = express()
const mongoose = require('mongoose')

app.use(express.urlencoded({extended: false}))

mongoose.connect("mongodb://localhost/urlshortener", {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => 
{
    res.render('index')
})

app.use(require('./routes/urlshortener'))

app.listen(process.env.PORT, () => {
    console.log("Server running at", process.env.PORT)
})
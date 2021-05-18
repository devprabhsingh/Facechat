const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const upload = require('express-fileupload');
const authRoutes = require('./routes/authRoutes');
const appRoutes = require('./routes/appRoutes');

const DB_URL = "mongodb+srv://Prabh02:prabh2002@sandbox.bi8od.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//const DB_URL = "mongodb://localhost:27017/facechatdb"

const app = express();

app.use(upload())
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())

app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));


//connecting to mongodb
mongoose.connect(DB_URL,{useNewUrlParser: true, useUnifiedTopology: true})
        .then(()=>console.log('MongoDB Connected...'))
        .catch(err=>console.log(err));

app.use('/',authRoutes)
app.use('/home',appRoutes)


// app runs on port 5000
const port = process.env.PORT || '5000';
app.listen(port);
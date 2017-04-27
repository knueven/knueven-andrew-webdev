var express = require('express');
require('dotenv').config();
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Auth stuff
var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

app.use(session({
    secret: process.env.PASSPORT_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

var mongoose = require('mongoose');
var connectionString = 'mongodb://127.0.0.1:27017/PhotoMapsDB';
var db = mongoose.createConnection(connectionString);

require ("./test/app.js")(app);
require ("./assignment/app.js")(app);
//require('./public/project/server/app.js')(app, db, mongoose);

var port = process.env.PORT || 3000;

app.listen(port);

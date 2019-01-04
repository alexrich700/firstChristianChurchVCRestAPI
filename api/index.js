const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    cookieParser = require('cookie-parser');
const textRoutes = require("./routes/text"),
    eventRoutes = require("./routes/event"),
    { loginRequired } = require("./middleware/auth"),
    userRoutes = require("./routes/users"),
    sermonRoutes = require("./routes/sermons");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// COOKIES
app.use(cookieParser());

mongoose.Promise = Promise;
mongoose.connect('mongodb://alexrich700:douglas1969@ds131932.mlab.com:31932/fcc-vc-rest-api', {
    keepAlive: true
});

// app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With,     Content-Type");
    next();
});



















///////////////ROUTES///////////////////////////

app.get('/', function(req, res){
    res.sendFile(__dirname + '/views'+ "/index.html");
});

app.get('/weeklySermon', loginRequired, function(req, res){
    res.sendFile(__dirname + '/views'+ "/weeklySermon.html");
});

app.get('/events', loginRequired, function(req, res){
    res.sendFile(__dirname + '/views'+ "/events.html");
});

app.get('/sermons', loginRequired, function(req, res){
    res.sendFile(__dirname + '/views'+ "/sermons.html");
});

app.get('/login', function(req, res){
    res.sendFile(__dirname + '/views'+ "/login.html");
});

app.get('/passwordreset', function(req, res){
    res.sendFile(__dirname + '/views'+ "/passwordReset.html");
});

app.use('/api/text', textRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/sermons', sermonRoutes);

app.listen(port, function(){
    console.log("APP IS RUNNING ON PORT " + process.env.PORT);
});
    
    
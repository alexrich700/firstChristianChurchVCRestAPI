var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var textRoutes = require("./routes/text");
var eventRoutes = require("./routes/event");
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");
var videoRoutes = require("./routes/videos");
var userRoutes = require("./routes/users");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/text-api', (error)=>{
  if(error) console.log(error);
});

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With,     Content-Type");
    next();
});

app.get('/', function(req, res){
    res.sendFile("index");
});

app.get('/weeklySermon', ensureCorrectUser, function(req, res){
    res.sendFile("weeklySermon");
});

app.get('/events', loginRequired, function(req, res){
    res.sendFile("events");
});

app.get('/sermons', loginRequired, function(req, res){
    res.sendFile("sermons");
});

app.use('/api/text', textRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/users', userRoutes);

app.listen(port, function(){
    console.log("APP IS RUNNING ON PORT " + process.env.PORT);
});
    
    
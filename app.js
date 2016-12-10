
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , photos=require('./routes/photos')
  , registration=require('./routes/registration')
  , authentication = require('./routes/authentication')
  , http = require('http')
  , path = require('path')
  , session = require('express-session')
  , redisStore = require('connect-redis')(session)
  , redis   = require("redis")
  , aws = require('./aws-upload/upload');


  var client  = redis.createClient();


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/views/partialviews')));

app.use(session({
    secret: 'ssshhhhh',
    // create new redis store.
    store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl :  260}),
    saveUninitialized: false,
    resave: false
}));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.get('/',routes.index);
app.get('/api/getPhotos/:id', photos.getPhotos);
app.get('/api/getProfileDetails/:id', user.getProfileDetails);
app.post('/api/editProfileDetails', user.editProfileDetails);
app.get('/api/getImageDetails/:id',photos.getImageDetails);
app.get('/users', user.list);
app.get('/aws', aws.uploadImage);
app.post('/api/register',registration.register);
app.post('/api/authentication',authentication.authenticate);
//app.


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

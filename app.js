
/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , user = require('./routes/user')
    , photos = require('./routes/photos')
    , registration = require('./routes/registration')
    , authentication = require('./routes/authentication')
    , http = require('http')
    , path = require('path')
    , session = require('express-session')
    , redisStore = require('connect-redis')(session)
    , redis = require("redis")
    , passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy

    , aws = require('./aws-upload/upload');


//var client = redis.createClient();
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/views/partialviews')));

app.use(express.cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
//passport config

passport.serializeUser(function (user, done) {
    console.log("serializing " + user.username);
    done(null, user.username);
});

passport.deserializeUser(function (username, done) {
    console.log("deserializing " + username);
    authentication.findUserById(username, done);

    //done(null, user);
});


// passport.use('local-signin', new LocalStrategy(
//     //allows us to pass back the request to the callback
//     function (username, password, done) {
//         authentication.localAuth(username, password)
//             .then(function (user) {


//                 if (user) {
//                     console.log("LOGGED IN AS: " + user.password);
//                    // req.session.success = 'You are successfully logged in ' + user.username + '!';
//                     console.log("fffdgfd");
//                     return done(null, user);
//                     //res.status(200).send("Success");
//                 }
//                 if (!user) {
//                     console.log("COULD NOT LOG IN");
//                     req.session.error = 'Could not log user in. Please try again.'; //inform user could not log them in
//                      return done(null, false);
//                 }
//             })
//             .fail(function (err) {
//                 console.log(err.body);
//             });


//     }
// ));


passport.use('local-signin', new LocalStrategy(
    function (username, password, done) {
        authentication.findUser(username, password, function (err, user) {
            if (err) {
                return done(err)
            }
            if (!user) {
                return done(null, false)
            }

            return done(null, user)
        })
    }
))

function authenticationMiddleware() {
    return function (req, res, next) {
        if (req.isAuthenticated()) {
            return next(req, res);
        }
        res.redirect('/renderError')
    }
}

passport.authenticationMiddleware = authenticationMiddleware;


// Simple route middleware to ensure user is authenticated.
// function ensureAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     req.session.error = 'Please sign in!';
//     res.redirect('/signin');
// }


// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/api/getPhotos/:id', photos.getPhotos);

app.get('/api/getMyPhotos/:id', photos.getMyPhotos);

app.post('/api/register', registration.register);


app.post('/api/authentication', passport.authenticate('local-signin', {
    successRedirect: '/renderSuccess',
    failureRedirect: '/renderError'
}));

app.get('/renderSuccess', function (req, res) {

    res.send("Sucesss");
});

app.get('/renderError', function (req, res) {

    res.status(401).send("Unauthorized");
});


app.get('/api/getProfileDetails/:id', user.getProfileDetails);
app.post('/api/editProfileDetails', user.editProfileDetails);
app.post('/api/editPhotoDetails', photos.editPhotoDetails);
app.get('/api/getImageDetails/:id',photos.getImageDetails);


app.get('/api/getProfileDetails/:id', user.getProfileDetails);
app.post('/api/editProfileDetails', user.editProfileDetails);

app.get('/api/getImageDetails/:id',photos.getImageDetails);

app.get('/api/getMyBuys/:id', photos.getMyBuys);
app.get('/api/getProfileDetails/:id', user.getProfileDetails);
app.post('/api/editProfileDetails', user.editProfileDetails);
app.post('/api/uploadPics', photos.uploadPhotos);

app.get('/users', user.list);
app.get('/api/getImageDetails/:id', photos.getImageDetails);

app.post('/logout', function(req, res){
  var name = req.user.username;
  console.log("LOGGIN OUT " + req.user.username)
  req.logout();
  res.redirect('/');
  req.session.notice = "You have successfully been logged out " + name + "!";
});

app.get('/aws', aws.uploadImage);

//app.

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});




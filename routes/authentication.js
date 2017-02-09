const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const mongo = require("./mongo");
const mongoURL = "mongodb://donita:donita@ds113628.mlab.com:13628/photogallery";
const Q = require('q');


exports.authenticate = function(req, res) {

	console.log("sffs"+req);

	mongo.connect(mongoURL, function() {


		mongo.collection('userCollection').findOne({
			"username": req.body.username,
			"password": req.body.password
		}, function(err, result) {
			console.log(result);
			if (err) {
				console.log(err);

			} else if (result) {
				console.log("Found the user", result);
				res.status(200).send("Success");

			} else {
				console.log("No User found with given credentials")
			}

			res.status(404).send({
				status_en: "Unauthorized"
			});



		});

	});




}

exports.findUserById = function(username, callback){

	mongo.connect(mongoURL, function() {


		mongo.collection('userCollection').findOne({
			"username": username
		}, function(err, result) {
			console.log(result);
			if (err) {
				console.log(err);
				callback(err);

			} else if (result) {
				console.log("Found the user", result);
				callback(null, result);

			} else {
				console.log("No User found with given credentials")
				callback(null, false);
			}

			



		});

	});

}

exports.findUser = function(username, password, callback) {


	mongo.connect(mongoURL, function() {


		mongo.collection('userCollection').findOne({
			"username": username,
			"password": password
		}, function(err, result) {
			console.log(result);
			if (err) {
				console.log(err);
				callback(err,null);

			} else if (result) {
				console.log("Found the user", result);
				callback(null, result);

			} else {
				console.log("No User found with given credentials")
				callback(null, null);
			}

			



		});

	});

}

exports.localAuth = function (username, password) {
  var deferred = Q.defer();

  mongo.connect(mongoURL, function (err, db) {
    var collection = mongo.collection('userCollection');

    collection.findOne({"username" : username})
      .then(function (result) {
        if (null == result) {
          console.log("USERNAME NOT FOUND:", username);

          deferred.resolve(false);
        }
        else {
          var hash = result.password;

          console.log("FOUND USER: " + result.username);

          // if (bcrypt.compareSync(password, hash)) {
          //   deferred.resolve(result);
          // } else {
          //   console.log("AUTHENTICATION FAILED");
          //   deferred.resolve(false);
          // }
          if(result.username === password){
          	console.log(result);
            deferred.resolve(result);
          } else {
            console.log("AUTHENTICATION FAILED");
            deferred.resolve(false);
          }

        }

        //db.close();
      });
  });

  return deferred.promise;
}






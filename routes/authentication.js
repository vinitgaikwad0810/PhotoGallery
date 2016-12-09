const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const mongo = require("./mongo");
const mongoURL = "mongodb://donita:donita@ds113628.mlab.com:13628/photogallery";

exports.authenticate = function(req, res) {

	console.log(req.body);

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
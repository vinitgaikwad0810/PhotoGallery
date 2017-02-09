var mongo = require("./mongo");
var mongoURL = "mongodb://donita:donita@ds113628.mlab.com:13628/photogallery";
 Q = require('q')

exports.register = function (req, res){

	console.log (req.body);
	mongo.connect(mongoURL,function() {

	mongo.collection('userCollection').insertOne(req.body,function(err, result) {
    
    console.log("Inserted a document into the userCollection collection.");
   
  	});

	});
	

	res.send("respond with a resource");
};



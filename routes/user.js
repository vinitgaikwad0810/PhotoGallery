var mongo = require("./mongo");
var mongoURL = "mongodb://cmpe_280:cmpe_280@ds113628.mlab.com:13628/photogallery";


var json_responses={};

exports.list = function(req, res){
  res.send("respond with a resource");
  //Donita
};


exports.getProfileDetails =function(req,res){
	var id=req.params.id;
	console.log("id:"+id);
	
	mongo.connect(mongoURL,function(){
		var coll=mongo.collection('userCollection');
		coll.findOne({
		    "username": id
		},function(err, user){
			if (user) {
				json_responses.status_code=200;
				json_responses.data=user;
				console.log(user);
				res.send( json_responses);

			} else {
				json_responses.status_code=500;
				console.log(err);
				res.send(json_responses);
			}
		});
	});
};

exports.editProfileDetails = function (req, res){

	console.log (req.body);
	mongo.connect(mongoURL,function() {

	mongo.collection('userCollection').update({username:req.body.username},req.body,
			   { upsert: true },function(err, result) {
				   if(err){
						json_responses.status_code=500;
						console.log(err);
						res.send(json_responses);
				   }
				   else{
					   json_responses.status_code=200;
					   console.log("Inserted a document into the userCollection collection.");
						res.send( json_responses);
				   }
    
  
   
  	});

	});
	


};
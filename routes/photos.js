var mongo = require("./mongo");
var mongoURL = "mongodb://cmpe_280:cmpe_280@ds113628.mlab.com:13628/photogallery";


var json_responses={};


exports.getPhotos = function(req, res){

	var id=req.params.id;
	console.log("id:"+id);

	mongo.connect(mongoURL,function(){
		var coll=mongo.collection('photo');
		coll.find({$and:[{
		    "imageData.owner": { $ne: id}}, {"imageData.bought_by": { $ne: id}
		},{
		    "owner": { $ne: id}}, {"bought_by": { $ne: id}
			}]}).sort({"ratings":-1}).toArray(function(err, photos){
			if (photos) {
				json_responses.status_code=200;
				json_responses.data=photos;
				console.log(photos);
				res.send( json_responses);

			} else {
				json_responses.status_code=500;
				console.log(err);
				res.send(json_responses);
			}
		});
	});

};



exports.getMyPhotos = function(req, res){

	var id=req.params.id;
	console.log("id:"+id);

	mongo.connect(mongoURL,function(){
		var coll=mongo.collection('photo');
		coll.find({"imageData.owner":id}).toArray(function(err, photos){
			if (photos) {
				json_responses.status_code=200;
				json_responses.data=photos;
				console.log(photos);
				res.send( json_responses);

			} else {
				json_responses.status_code=500;
				console.log(err);
				res.send(json_responses);
			}
		});
	});

};



exports.editPhotoDetails = function (req, res){
	 var ObjectId = require('mongodb').ObjectID;
	 var photo=req.body;
	console.log (req.body);
	mongo.connect(mongoURL,function() {

	mongo.collection('photo').update({_id:ObjectId(photo._id)},{ $set: { "imageData.photo_name":photo.photo_name, "imageData.description": photo.description,"imageData.cost":photo.cost}},
			   { upsert: true },function(err, result) {
				   if(err){
						json_responses.status_code=500;
						console.log(err);
						res.send(json_responses);
				   }
				   else{
					   json_responses.status_code=200;
					   console.log("updated a document into the photo collection.");
						res.send( json_responses);
				   }
    
  
   
  	});

	});
	


};


exports.getImageDetails= function(req, res){

	var id=Number(req.params.id);
	console.log("id:"+id);

	mongo.connect(mongoURL,function(){
		var coll=mongo.collection('photo');
		coll.findOne({
		    "photo_id": id
		},function(err, photos){
			if (photos) {
				json_responses.status_code=200;
				json_responses.data=photos;
				console.log(photos);
				res.send( json_responses);

			}else{
				json_responses.status_code=500;
				console.log(err);
				res.send(json_responses);
				}
			});
	});
};
exports.getMyBuys = function(req, res){
	
	var id=req.params.id;
	console.log("id:"+id);
	
	mongo.connect(mongoURL,function(){
		var coll=mongo.collection('photo');
		coll.find({
		    "imageData.bought_by": id
		}).toArray(function(err, photos){
			if (photos) {
				json_responses.status_code=200;
				json_responses.data=photos;
				console.log(photos);
				res.send( json_responses);

			} else {
				json_responses.status_code=500;
				console.log(err);
				res.send(json_responses);
			}
		});
	});

};


exports.uploadPhotos = function(req, res){
	
	var docs=req.body;
	console.log("docs:"+docs);
	mongo.connect(mongoURL,function() {

		mongo.collection('photos').insertOne(req.body,function(err, result) {
	    
				if(err){
					json_responses.status_code=500;
					console.log(err);
					res.send(json_responses);
				}else{
					json_responses.status_code=200;
					res.send( json_responses);
				}  
	  	});

		});	

};



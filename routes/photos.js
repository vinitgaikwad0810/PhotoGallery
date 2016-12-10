var mongo = require("./mongo");
var mongoURL = "mongodb://cmpe_280:cmpe_280@ds113628.mlab.com:13628/photogallery";


var json_responses={};


exports.getPhotos = function(req, res){

	var id=req.params.id;
	console.log("id:"+id);

	mongo.connect(mongoURL,function(){
		var coll=mongo.collection('photo');
		coll.find({
		    "owner": id
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
exports.getImageDetails= function(req, res){

	var id=req.params.id;
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

			} else {
				json_responses.status_code=500;
				console.log(err);
				res.send(json_responses);
			}
		});
	});

};

var mongo = require("./mongo");
var mongoURL = "mongodb://cmpe_280:cmpe_280@ds113628.mlab.com:13628/photogallery";


var json_responses = {};


exports.getPhotos = function (req, res) {


    var id = req.params.id;
    console.log("id:" + id);


    mongo.connect(mongoURL, function () {
        var coll = mongo.collection('photo');
        coll.find({
            "imageData.owner": id
        }).toArray(function (err, photos) {
            if (photos) {
                json_responses.status_code = 200;
                json_responses.data = photos;
                console.log(photos);
                res.send(json_responses);

            } else {
                json_responses.status_code = 500;
                console.log(err);
                res.send(json_responses);
            }
        });
    });

};



exports.getPhotosByTag = function (req, res) {

    var tag = req.params.tag;
    console.log("Tag");
    console.log(tag);
    tagArr = [];
    tagArr[tagArr.length] = tag;

    mongo.connect(mongoURL, function () {
        var coll = mongo.collection('photo');
        coll.find({
            "imageData.tags": tag
        }).toArray(function (err, photos) {

                if (photos) {
                    json_responses.status_code = 200;
                    json_responses.data = photos;
                    console.log(photos);
                    res.send(json_responses);

                } else {
                    json_responses.status_code = 500;
                    console.log(err);
                    res.send(json_responses);
                }
            }
        );
    });


}


exports.getImageDetails = function (req, res) {

    var id = req.params.id;
		var ObjectId = require('mongodb').ObjectID;
    console.log("id:" + id);

    mongo.connect(mongoURL, function () {
        var coll = mongo.collection('photo');
        coll.findOne({
            "_id": ObjectId(id)
        }, function (err, photos) {
            if (photos) {
                json_responses.status_code = 200;
                json_responses.data = photos;
                console.log(photos);
                res.send(json_responses);

            } else {
                json_responses.status_code = 500;
                console.log(err);
                res.send(json_responses);
            }
        });
    });
};

/*Post bought picture's id and rating*/
exports.putPicDetails= function(req, res){

	var id=req.params.id;
	var ratings=req.params.ratings;
	var username=req.params.username;
	// console.log("backendid:"+id);
  var ObjectId = require('mongodb').ObjectID;
	mongo.connect(mongoURL,function(){
		var coll=mongo.collection('photo');
		coll.update({
		    "_id": ObjectId(id)},
				{ $set: { $inc:{	"ratings":1
				   }    },
						"bought_buy":[username]},
						{upsert: true, multi: true
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

/* ends */
exports.getMyBuys = function (req, res) {

    var id = req.params.id;
    console.log("id:" + id);

    mongo.connect(mongoURL, function () {
        var coll = mongo.collection('photo');
        coll.find({
            "bought_by": id
        }).toArray(function (err, photos) {
            if (photos) {
                json_responses.status_code = 200;
                json_responses.data = photos;
                console.log(photos);
                res.send(json_responses);

            } else {
                json_responses.status_code = 500;
                console.log(err);
                res.send(json_responses);
            }
        });
    });


};




exports.uploadPhotos = function (req, res) {

    var docs = req.body;
    console.log("docs:" + docs);
    mongo.connect(mongoURL, function () {

        mongo.collection('photo').insertOne(req.body, function (err, result) {

            if (err) {
                json_responses.status_code = 500;
                console.log(err);
                res.send(json_responses);
            } else {
                json_responses.status_code = 200;
                res.send(json_responses);
            }
        });

    });


};

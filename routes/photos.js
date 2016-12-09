var mongo = require("./mongo");
var mongoURL = "mongodb://cmpe_280:cmpe_280@ds113628.mlab.com:13628/photogallery";


var json_responses={};


exports.afterLogin = function(req, res){
	
	mongo.connect(mongoURL,function(){
		var coll=mongo.collection('photo');
		coll.find().toArray(function(err, photos){
			if (photos) {
				json_responses.status_code=200;
				json_responses.data=photos;
				console.log(photos);
				res.render('homepage.ejs', { title: 'Express',data:photos });

			} else {
				json_responses.status_code=500;
				console.log(err);
			//	res.send(json_responses);
			}
		});
	});

};


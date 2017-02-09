var mongo = require("./mongo");
var mongoURL = "mongodb://donita:donita@ds113628.mlab.com:13628/photogallery";


var json_responses={};


exports.index = function(req, res){
	res.render('index', { title: 'Photo Gallery'});		

};



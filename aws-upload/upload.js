
var aws = require('aws-sdk');
var url = require('url');

aws.config.loadFromPath('config.json');

exports.uploadImage = function(request, response) {
  var dateTime = new Date();
  var s3 = new aws.S3();
  var params= {Bucket: '', Key:request.query['filename'], ContentType:request.query['filetype'], ACL: 'public-read-write'} ;
  s3.getSignedUrl('putObject', params, function(error, link){
    if (error) {

    } else {
      var parsedLink = url.parse(link);
      parsedLink.search = null;
      var responseLink = url.format(parsedLink);
      response.send(responseLink);
    }
  });


}

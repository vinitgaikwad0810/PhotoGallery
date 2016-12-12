
var aws = require('aws-sdk');
var url = require('url');

aws.config.loadFromPath('config.json');


aws.config.region = process.env.S3_REGION;
aws.config.accessKeyId = process.env.S3_KEY;
aws.config.secretAccessKey = process.env.S3_SECRET;

exports.uploadImage = function(request, response) {
  var dateTime = new Date();
  var s3 = new aws.S3();
  var params= {Bucket: 'photobucket280', Key:request.query['filename'], ContentType:request.query['filetype'], ACL: 'public-read-write'} ;
  s3.getSignedUrl('putObject', params, function(error, link){
    if (error) {

    } else {
      var parsedLink = url.parse(link);
      parsedLink.search = null;
      var responseLink = url.format(parsedLink);
      response.send(responseLink);
    }
  });
  //response.send(200);

}

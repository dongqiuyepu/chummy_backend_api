/**
 * Created by johnpu on 5/22/15.
 */
var express = require('express');
var router = express.Router();
var config = require('../config');
var imageModel = require('../models/imageModel');

var cloudinary = require('cloudinary');

// config cloudinary to image serving
cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.api_secret
});

// configuration variables
var imageHeight = config.imageSize.height;
var imageWidth = config.imageSize.width;

router.route('/')
    .get(function(request, response) {
        imageModel.getImage(request, response);
    })
    .post(function(request, response) {
        console.log(req.files);
        // upload to cloudinary
        cloudinary.uploader.upload(request.files.file.path, function (result) {
            var tmp = cloudinary.url(result.public_id+".jpg", {width: imageWidth, height: imageHeight, crop: "scale"});
            // TODO insert to db before sending response
            response.send(tmp);
        }, {public_id: request.files.file.name.replace(/\.(.*?)$/i, "")});
    });

module.exports = router;
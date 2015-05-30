var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');

var Utils = require('./utils/utils');
var imagesRouter = require('./routes/imageRouter');

/* -------------- Middleware ----------- */

app.use(multer({
    dest: './image_uploads/',
    inMemory: false,
    rename: function (fieldname, filename) {
        return Utils.fileNameGen(filename, "");
    }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* --------------- Routers ----------- */

app.get('/', function (request, response) {
    response.send('Hello World!');
});

app.use('/imagesRouter', imagesRouter);

/* -------------- Start app ----------- */

app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});

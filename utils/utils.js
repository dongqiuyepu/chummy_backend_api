/**
 * Created by johnpu on 5/21/15.
 */
var chance = require('chance').Chance();

var Utils = function() {};

Utils.randomSeq = function() {
    return chance.string();
}

Utils.fileNameGen = function(filename, ext) {
    if (ext != ""){
        filename = filename.replace("." + ext, "");
    }
    return filename + "_" + chance.string().replace(/\W+/g, "") + "_" + Date.now();
}

module.exports = Utils;
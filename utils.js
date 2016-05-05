

var _ = require("underscore");
var config = require("./config");

function PASS(){}

var log = { 
    "debug": PASS,
    "error": PASS,

}


if(config.DEBUG){
    var winston = require('winston');
    winston.level = 'error';
    winston.prettyPrint = true;
    log.debug = _.partial(winston.log, 'debug');
    log.error = _.partial(winston.log, 'error');
}


module.exports = {
    log: log,
}


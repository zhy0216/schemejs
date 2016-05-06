

var _ = require("underscore");
var config = require("./config");


function PASS(){}

var log = { 
    "debug": PASS,
    "error": PASS,
}


var func = {
    isAtom: function(value){
        return _.isBoolean(value) || _.isNumber(value) || _.isString(value);
    }
}


if(config.DEBUG){
    var winston = require('winston');
    winston.level = 'debug';
    winston.prettyPrint = true;
    
    log.debug = _.partial(winston.log, 'debug');
    // log.debug = console.log
    log.error = _.partial(winston.log, 'error');
}


module.exports = {
    log: log,
    func: func,
}


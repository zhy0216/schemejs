'use strict';

var _ = require("underscore");
var config = require("./config");

class MySymbol{
    constructor(symbol) {
        this.symbol = symbol;
    }
    toString(){
        return this.symbol.toString()
    }
}

function PASS(){}

var log = { 
    "debug": PASS,
    "error": PASS,
}


var func = {
    isAtom: function(value){
        return _.isBoolean(value) 
                || _.isNumber(value) 
                || _.isString(value)
                || value instanceof MySymbol;
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
    model: {MySymbol:MySymbol}
}


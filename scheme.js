

var parse = require("./parser").parse;
var _ = require("underscore");

function interpreter(expr){
    var parsedData = parse(expr);
    var env = {
        '+': (x,y) => x + y,

    }

    return _inter(parsedData, env);
}

function lookup(symbol, env){
    if(_.has(env, symbol)){
        return env[symbol]
    }
    throw new Error('no ' + symbol + "in env");
}

function _inter(expr, env){
    if(_.isArray(expr)){
        if(expr.length === 1){
            return _inter(expr[0])
        }

        if(_.isString(expr[0])){
            if(expr[0] == '+'){
                return _inter(expr[1]) + _inter(expr[2]);
            }
        }
    }
    if(_.isNumber(expr) || _.isBoolean(expr)){
        return expr;
    }

    if(_.isString(expr)){
        return lookup(expr, env)
    }

}



console.log(interpreter("(+ 1 2)")) // ==> 3
console.log(interpreter("(+ 1 (+ 1 2))")) // ==> 4






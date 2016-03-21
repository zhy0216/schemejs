

var parse = require("./parser").parse;
var _ = require("underscore");

function interpreter(expr){
    var parsedData = parse(expr);
    var env = {
    }

    return _inter(parsedData, env);
}

function lookup(symbol, env){
    if(_.has(env, symbol)){
        return env[symbol]
    }
    // console.log(env);
    throw new Error('no ' + symbol + " in env");
}

function _inter(expr, env){
    // console.log(expr);
    // console.log(env);
    if(_.isArray(expr)){
        if(expr.length === 1){
            return _inter(expr[0], env)
        }

        if(_.isString(expr[0])){
            if(expr[0] == '+'){
                return _inter(expr[1], env) + _inter(expr[2], env);
            }

            if(expr[0] == 'lambda'){
                return function(x){
                    env[expr[1][0]] = x;
                    return _inter(expr[2], env);
                }
            }
        }

        return _inter(expr[0], env)(_inter(expr[1], env))

    }
    if(_.isNumber(expr) || _.isBoolean(expr)){
        return expr;
    }

    if(_.isString(expr)){
        return lookup(expr, env)
    }

}




module.exports = {
    interpreter: interpreter,
}


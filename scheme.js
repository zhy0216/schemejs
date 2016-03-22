

var parse = require("./parser").parse;
var _ = require("underscore");

var globalEnv = {
    'sub1': x => x - 1,
    'add1': x => x + 1,
    'zero?': x => x === 0,
    '+': (x, y) => x + y,
    '*': (x, y) => x * y,
    'eq?': (x, y) => x === y,

    // null?
}

function interpreter(expr){
    var parsedData = parse(expr);
    var env = {};
    var defineExpr = [];
    var bodyExpr = [];
    _.each(parsedData, function(ele, index, list){
        if(ele[0] === 'define'){
            defineExpr.push(ele);
        }else{
            bodyExpr.push(ele);
        }
    })
    _.each(defineExpr, function(ele, index, list){
        _defineEnv(ele, env);
    })

    return _inter(bodyExpr, env);
}

function _defineEnv(expr, env){
    // assgin to env
    // if env has the value then throw error
    if(_.has(env, expr[1])){
        throw new Error(expr[1] + " already defined");
    }

    env[expr[1]] = _inter(expr[2], env);
}

function lookup(symbol, env){
    if(_.has(env, symbol)){
        return env[symbol]
    }
    // console.log(env);

    if(_.has(globalEnv, symbol)){
        return globalEnv[symbol]
    }


    throw new Error('no ' + symbol + " in env");
}

function _inter(expr, env){
    // console.log("========start==========")
    // console.log(expr);
    // console.log(env);
    // console.log("========end==========")
    if(_.isArray(expr)){
        if(expr.length === 1){ // can be removed when deal with define
            return _inter(expr[0], env)
        }

        if(_.isString(expr[0])){
            if(expr[0] === 'lambda'){
                return function(){
                    var args = arguments;
                    var extendEnv = _.create({}, env)
                    _.each(expr[1], function(ele, index, list){
                        extendEnv[ele] = args[index];
                    })

                    return _inter(expr[2], extendEnv);
                }
            }

            if(expr[0] === 'let'){
                var newEnv = _.create({}, env)
                _.each(expr[1], function(ele, index, list){
                    newEnv[ele[0]] = _inter(ele[1], env);
                });

                // console.log("newEnv:");
                // console.log(newEnv);
                var result;
                _.each(expr.slice(2), function(ele, index, list){
                    result = _inter(ele, newEnv);
                })
                return result;
            }

            if(expr[0] === 'letrec'){
                var newEnv = _.create({}, env);
                _.each(expr[1], function(ele, index, list){
                    newEnv[ele[0]] = _inter(ele[1], newEnv);
                });

                var result;
                _.each(expr.slice(2), function(ele, index, list){
                    result = _inter(ele, newEnv);
                })
                return result;
            }

            if(expr[0] === 'if'){
                var cond = _inter(expr[1], env);
                if(cond){
                    return _inter(expr[2], env);
                }else{
                    return _inter(expr[3], env)
                }
            }

            if(expr[0] === 'begin'){
                var result;
                _.each(expr.slice(1), function(ele, index, list){
                    result = _inter(ele, env);
                })
                return result;
            }

            if(expr[0] === 'set!'){
                env[expr[1]] = _inter(expr[2], env);
                return ;
            }
        }

        // '(e1 e2)  ==> application
        var lambda = _inter(expr[0], env);
        var args = [];
        _.each(expr.slice(1), function(ele, index, list){
            args.push(_inter(ele, env));
        })
        args.push(env);
        return lambda.apply({}, args);

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


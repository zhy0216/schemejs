
var winston = require('winston');
var parse = require("./parser").parse;
var _ = require("underscore");

winston.level = 'error';
winston.prettyPrint = true
var debug = _.partial(winston.log, 'debug');


var globalEnv = {
    'sub1': x => x - 1,
    'add1': x => x + 1,
    'zero?': x => x === 0,
    '+': (x, y) => x + y,
    '*': (x, y) => x * y,
    'eq?': (x, y) => toString(x) === toString(y),
    'car': x => {
        debug("_.first x[1]", _.first(x[1]) )
        return quoteUnwrap(["'", _.first(x[1])])
    },
    'cdr': x => quoteUnwrap(["'", _.rest(x[1])]),
    'cons': (x, y) => {
        if(_.isArray(x)){
            y[1].unshift(x[1]);
        }else{
            y[1].unshift(x);
        }
        return [y[0], y[1]]

    },
    'null?': x => x[0] === "'" && x[1].length === 0,
    'not': x => !x,
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

    return toString(_inter(bodyExpr, env));
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

function quoteUnwrap(expr, quoteStart){
    var quoteStart = quoteStart || false;
    debug("<======== quoteUnwrap .. start =================>")
    debug(expr)
    debug(quoteStart)
    debug("<======== quoteUnwrap .. end =================>")
    if(_.isArray(expr)){
        if (expr[0] === "'"){
            if(quoteStart){
                return quoteUnwrap(expr[1], true)
            }
        
            if(_.isNumber(expr[1]) || _.isBoolean(expr[1])){
                return expr[1];
            }
        
        }

        return expr.map(x => quoteUnwrap(x, quoteStart))
    }


    if(_.isNumber(expr[1]) || _.isBoolean(expr[1])){
        return expr[1];
    }
    return expr;
}

function _inter(expr, env){
    debug("========start==========")
    debug(expr);
    debug(env);
    debug("========end==========")
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

            if(expr[0] === "'"){
                return quoteUnwrap(expr);
            }

            if(expr[0] === "cond"){
                var restCondition = expr.slice(1);
                var condexpr = restCondition[0];
                if(condexpr[0] === 'else'){
                    return _inter(condexpr[1], env);
                }
                var condition = _inter(condexpr[0], env);
                debug("condition: ", condition)
                if(restCondition.length === 1){
                    debug("condition: ", condition)
                    if(condition){
                        return _inter(condexpr[1], env);
                    }else{
                        return ;
                    }
                }else{
                    if(condition){
                        return _inter(condexpr[1], env);
                    }else{
                        restCondition.shift()
                        return _inter(['cond'].concat(restCondition), env);
                    }
                }
            }

            if(expr[0] === 'list'){
                expr.shift()
                debug("result:", quoteUnwrap(expr,true))
                var newExpr = expr.map(x => _inter(x, env))
                return _inter(["'", quoteUnwrap(newExpr,true)], env)
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

function toString(expr){
    if(_.isArray(expr)){
        if(expr[0] === "'"){
            if(_.isNumber(expr[1]) || _.isBoolean(expr[1])){
                return toString(expr[1]);
            }

            return "'" + expr.slice(1).map(x => toString(x)).join(" ")
        }

        return "(" + expr.map(x => toString(x)).join(" ") + ")";
    }

    return expr;
}

module.exports = {
    interpreter: interpreter,
    toString: toString
}


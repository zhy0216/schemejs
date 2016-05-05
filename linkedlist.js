'use strict';

var _ = require("underscore");
var u = require("./utils");

var debug = u.log.debug;
var error = u.log.error;


class LinkedList {
    constructor(list){ // array
        this.head = null;
        this.tail = null;

        this._state = "NULL"; // NULL, QUOTE, QUANSIQUOTE
        this._parse(list);
    }

    _parse(list){
        // debug(list);
        if (list === null || list === undefined){
            return ;
        }

        if(list instanceof LinkedList){
            // maybe copy this list;
            // see if necessary
            return ;
        }

        if(_.isArray(list)){
            if(list.length === 0){
                return ;
            }
            if(this._state === "NULL"){
                if(list[0] === "'"){
                    this._state = "QUOTE";
                    return this._parse(list.slice(1))
                }

                if(list[0] === "`"){  // not consider so far
                    this._state = "QUANSIQUOTE";
                    return this._parse(list.slice(1))
                    return ;
                }

                throw new Error("error");
            }
        }


        throw new Error("list is not atom!");
    }

    static parse(){

    }

    static isNull(l){
        if((l instanceof LinkedList)
            & (l.head === null)
            & (l.tail === null)){
            return true;
        }
        return false;
    }

    toString(){
        return "'" + this._tostr();
    }

    tostr(withdot){
        return this._tostr(withdot);
    }

    _tostr(withdot){
        var result = "("
        if(this.head !== null){
            if(this.head instanceof LinkedList){
                result += this.head.toString();
            }
        }


        if(withdot){
            result += " . "
        }

        if(this.tail !== null){



            result += this.tail.toString();
        }

        result += ")";
        return result;

    }
}


module.exports = LinkedList;
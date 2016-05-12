'use strict';

var _ = require("underscore");
var u = require("./utils");

var debug = u.log.debug;
var error = u.log.error;


class LinkedList {
    constructor(list, _state){ // array
        this.head = null;
        this.tail = null;

        this._state = _state || "NULL"; // NULL, QUOTE, QUANSIQUOTE
        this._parse(list);
    }

    _parse(list){
        debug("_parse: ", list);
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
                    return this._parse(list[1])
                }

                if(list[0] === "`"){  // not consider so far
                    this._state = "QUANSIQUOTE";
                    return this._parse(list[1])
                }

                throw new Error("error");
            }

            if(this._state === "QUOTE"){
                debug("QUOTE: ", list)
                if(u.func.isAtom(list[0])){
                    this.head = list[0];
                }else{
                    this.head = new LinkedList(list[0], this._state);
                }

                if(list[1] === "."){
                    if(list.length === 3 && u.func.isAtom(list[2])){
                        this.tail = list[2]
                    }else{
                        if(list.length !== 3){
                            throw new Error(`parse: in valid use "." !`);
                        }

                        this.tail = new LinkedList(list[2], this._state);
                    }
                }else{
                    this.tail = new LinkedList(list.slice(1), this._state);
                }
                    

                return ;
            }



        }


        throw new Error("some error in _parse!");
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

    static isPair(l){
        debug("isPair: ", l);
        if(l instanceof LinkedList){
            return !LinkedList.isNull(l);
        }

        return false;
    }

    toString(){
        return "'" + this._tostr(false, true);
    }

    tostr(withdot){
        return "'" +this._tostr(withdot, true);
    }

    _tostr(withdot, dotbefore, last){
        debug("_tostr: ", this)
        var dotbefore = dotbefore || false;
        var last = last || false;
        var result = "";
        var needClose = false;

        if(LinkedList.isNull(this)){
            if(dotbefore){
                return "()";
            }else{
                return "";
            }
        }

        if(u.func.isAtom(this.head) && u.func.isAtom(this.tail)){
            return "("+this.head + " . " + this.tail + ")";
        }


        debug("_tostr dotbefore: ", dotbefore)
        debug("_tostr last: ", last)

        if(dotbefore){
            result += "("
            needClose = true
        }
        
        if(this.head !== null){
            if(this.head instanceof LinkedList){
                debug("this.head: ", this.head)
                result += "(" + this.head._tostr(withdot, false, false) + ")";
            }else{
                result += this.head.toString();
            }
        }
        if(withdot){
            result += " . "
            dotbefore = true
        }else{
            dotbefore = false
        }

        if(!last && !withdot && !LinkedList.isNull(this.tail)){
            result += " "
        }

        if(this.tail !== null){
            if(this.tail instanceof LinkedList){
                if(this.tail.tail === null
                    ||  (LinkedList.isNull(this.tail.tail))){
                    result += this.tail._tostr(withdot, dotbefore, true);
                }else{
                    result += this.tail._tostr(withdot, dotbefore);
                }
            }else{
                result += this.tail.toString();
            }
        }



        if(needClose){
            result += ")";
        }
        return result;

    }
}

LinkedList.NULL = new LinkedList();

module.exports = LinkedList;
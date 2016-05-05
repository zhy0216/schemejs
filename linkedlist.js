'use strict';

var _ = require("underscore")

class LinkedList {
    constructor(list){ // array
        this.head = null;
        this.tail = null;
        this._parse(list);
    }

    _parse(list){
        if(list instanceof LinkedList){
            // maybe copy this list;
            // see if necessary
            return ;
        }

        if(!_.isArray(list)){
            throw new Error("list is not atom!");
        }

        // header == null
        // header == array
        //
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

    tostr(){
        return "'" + this.toString();
    }

    toString(){
        var result = "("
        if(this.head !== null){
            result += this.head.toString();
        }

        if(this.tail !== null){
            result += this.tail.toString();
        }

        result += ")";
        return result;

    }
}


module.exports = LinkedList;
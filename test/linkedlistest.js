
var assert = require('assert');
var should = require('should');

var u = require("../utils");

var debug = u.log.debug;

var LinkedList = require("../linkedlist");

describe('Linked List', function () {
    describe('constructor', function () {
        it("null", function(){
            var l = new LinkedList();
            l.toString().should.equal("'()")
        })

        it("array []", function(){
            var l = new LinkedList([]);
            l.toString().should.equal("'()")
        })

        it("simple 1 array", function(){
            var l = new LinkedList(["'", [1,2,3]]);
            l.toString().should.equal("'(1 2 3)")
        })

        it.only("simple 2 array", function(){
            var l = new LinkedList(["'", [1,2,3, [4]]]);
            l.toString().should.equal("'(1 2 3 (4))")
        })

        it("with dots", function(){
            var l = new LinkedList(["'", [1,2,3]]);
            l.tostr(true).should.equal("'(1 . (2 . (3 . ())))")
        })

    })
})
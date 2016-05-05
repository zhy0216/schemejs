
var assert = require('assert');
var should = require('should');

var LinkedList = require("../linkedlist");

describe('Linked List', function () {
    describe('constructor', function () {
        it("null", function(){
            var l = new LinkedList();
            l.tostr().should.equal("'()")
        })

        it("array []", function(){
            var l = new LinkedList([]);
            l.tostr().should.equal("'()")
        })

        it("simple array", function(){
            var l = new LinkedList(["'", [1,2,3]]);
            l.tostr().should.equal("'(1 2 3)")
        })
    })
})
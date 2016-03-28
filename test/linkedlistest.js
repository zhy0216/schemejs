
var assert = require('assert');
var should = require('should');

var LinkedList = require("../linkedlist");


describe('linkedlist', function () {
    it("constructor", function(){
        var l = new LinkedList();
        l.tostr().should.equal("'()")
    })



})

var assert = require('assert');
var should = require('should');
var intpr = require("../scheme").interpreter;

describe('interpreter', function () {
    it('plus', function () {
        intpr("(+ 1 45)").should.equal(46);
        intpr("(+ 1 (+ 1 44))").should.equal(46)
    })

    it('lambda', function () {
        intpr("(lambda (x) x)")(46).should.equal(46)
        intpr("((lambda (x) (+ x 2)) 44)").should.equal(46) 

    })

    it('let', function () {
        intpr("(let ((x 1)) (+ x 45))").should.equal(46) 
    })


    it('', function () {

    })
})

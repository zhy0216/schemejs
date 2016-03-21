
var assert = require('assert');
var should = require('should');
var intpr = require("../scheme").interpreter;


intpr("(+ 1 45)").should.equal(46);
intpr("(+ 1 (+ 1 44))").should.equal(46)
intpr("(lambda (x) x)")(46).should.equal(46)
intpr("((lambda (x) (+ x 2)) 44)").should.equal(46) 

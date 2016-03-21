
var assert = require('assert');
var should = require('should');
var inter = require("../scheme").interpreter;

describe('interpreter', function () {
    it('plus', function () {
        inter("(+ 1 45)").should.equal(46);
        inter("(+ 1 (+ 1 44))").should.equal(46)
    })

    it('sub1 & add1', function () {
        inter("(sub1 47)").should.equal(46);
        inter("(add1 45)").should.equal(46);
    })

    it('lambda', function () {
        inter("(lambda (x) x)")(46).should.equal(46)
        inter("((lambda (x) (+ x 2)) 44)").should.equal(46) 

    })

    it('let', function () {
        inter("(let ((x 1)) (+ x 45))").should.equal(46) 
    })

    it('if', function () {
        inter("(if (zero? 0) 46 0)").should.equal(46) 
    })



    it('fact', function () {
        inter("\
                (let ((fact \ (lambda (n) \
                                    (if (zero? n) \
                                        1 \
                                        (* n  (fact (sub1 n))))))) \
                    (+ (fact  4) 22))").should.equal(46);
    })

     it('', function () {

    })
})




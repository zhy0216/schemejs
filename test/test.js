
var assert = require('assert');
var should = require('should');
var inter = require("../scheme").interpreter;
var tostr = require("../scheme").toString;

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
        inter("(if (eq? 46 46) 46 0)").should.equal(46) 
    })

    it('fact', function () {
        inter(`
                (letrec ((fact  (lambda (n) 
                                    (if (zero? n) 
                                        1 
                                        (* n  (fact (sub1 n))))))) 
                    (+ (fact  4) 22))`).should.equal(46);
    })

    // http://www.ece.uc.edu/~franco/C511/html/Scheme/ycomb.html

    it('Y combinator', function () {
        inter(`(((lambda (X) 
              ((lambda (procedure) 
                 (X (lambda (arg) ((procedure procedure) arg)))) 
               (lambda (procedure) 
                 (X (lambda (arg) ((procedure procedure) arg)))))) 
            (lambda (func-arg) 
              (lambda (n)
                (if (zero? n) 
                    1 
                    (* n (func-arg (sub1 n))))))) 
           5)`).should.equal(120);
    })

    it('support two arg lambda', function(){
        inter("(lambda (x y) x)")(46, 1).should.equal(46)
        inter("(lambda (x y) (+ x y))")(45, 1).should.equal(46)
        inter("((lambda (x y) (+ x y)) 45 1)").should.equal(46)
    })

    it('begin', function(){
        inter("(begin (+ 1 2) 46)").should.equal(46)
    })

    it('set!', function(){
        inter("(let ((x 45))(begin (set! x 46) x))").should.equal(46)
    })

    it('let multi body',function(){
        inter("(let ((x 45))(set! x 46) x)").should.equal(46)
    })

    it('call-by-value', function(){
        inter(`
            ((lambda (a) 
                  ((lambda (p) 
                     (begin 
                      (p a) 
                      a)) (lambda (x) (set! x 3)))) 46)`).should.equal(46)
    })

    it('let set! check', function(){
        inter(`
            (let ((x 46)) 
                (let ((x 45)) 
                    (set! x 44)) 
            x)`).should.equal(46)
    })


    // use globalEnv? buildInEnv
    it('define', function(){
        inter(`
            (define x (lambda (x) x))
            (x 46)`).should.equal(46);

        (function(){
            inter(`
            (define x (lambda (x) x))
            (define x (lambda (x) x))
        `)}).should.throwError();
    })

    // 
    it('cond', function(){

    })

    // 
    it('quote & tostring', function(){
        inter("'()").should.equal("'()");
        inter("'1").should.equal(1);
        inter("'a").should.equal("'a");
        inter("#t").should.ok;
        inter("'(1 2 3)").should.equal("'(1 2 3)");
        inter("'(1 (2) 3)").should.equal("'(1 (2) 3)");
        inter("'(+ 1 (+ 1 2) 3)").should.equal("'(+ 1 (+ 1 2) 3)");
    })

    it('car & cdr', function(){
        inter("(car '(1 2 3))").should.equal(1);
        inter("(car '((1 2) 3))").should.equal("'(1 2)");
        inter("(cdr '(1 2 3))").should.equal("'(2 3)");
        inter("(cdr '((1 2) 3))").should.equal("'(3)");
    })

    it('cons', function(){
        inter("(cons 'a '(1 2))").should.equal("'(a 1 2)")
        inter("(cons '1 '(1 2))").should.equal("'(1 1 2)")
        inter("(cons 2 '(1 2))").should.equal("'(2 1 2)")
        inter("(cons '(2) '(1 2))").should.equal("'((2) 1 2)")
    })

    it('quasiquote', function(){
        // inter("")
    })

    // this is difficult
    it('match', function(){

    })



})




var fs = require("fs");

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

    it('null?', function () {
        inter("(null? '())").should.ok
        inter("(not #f)").should.ok
        inter("(not (null? 1))").should.ok
        inter("(not (null? '(1)))").should.ok
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

        inter('(cond (#t 46))').should.equal(46);

        inter(`
            (cond
                ((car '(#f a b)) 7)
                (#f 8)
                ((car '(a b)) 46)
            )
        `).should.equal(46);
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
        inter("(not (car '(#f 2 3)))").should.ok;
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

    it('list', function(){
        inter("(list 1 2)").should.equal("'(1 2)")
        inter("(list 'a 2)").should.equal("'(a 2)")
        inter(`(let ((x 'a))
                (list x 2))
        `).should.equal("'(a 2)")
    })

    it.skip('quasiquote', function(){
        inter("\
            (let ((x 'a)) \
                `(a ,x)) \
        ").should.equal("'(a a)")
    })

    // this is difficult
    it('match', function(){

    })

})

describe('complicate test', function(){
    function testSchemeFile(filename, expectValue){
        // relative path: scheme/
        it(filename, function(doneit){
            fs.readFile('test/scheme/'+filename, "utf-8", 
                function (err, data) {
                    if (err) {
                        throw err;
                    }
                    inter(data).should.equal(expectValue);
                    doneit();
                });
        })
    }

    testSchemeFile("1.1.rkt", "'(5 4 3 2 1 0)");
    testSchemeFile("1.2.rkt", "'(x y z z x y y x y)");


})



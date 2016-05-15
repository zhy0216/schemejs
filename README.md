## schemejs

Yet another toy js implementation of scheme ~~ 

![travis ci](https://travis-ci.org/zhy0216/schemejs.svg?branch=master)

### under development (try some es6 features)

## usage
* `npm install -g`
* `pegjs scheme.pegjs parser.js`  ---> generate parser
* `mocha`  ---> see the test

It's no coincidence that every test case is equal to 46.

## TODO

- [ ] quasiquote?
// 
- [ ] macro???

- [ ] make gulp for browser scheme.js
- [ ] make web demo

### Reference

Parser:
* [the little javascript](http://www.crockford.com/javascript/little.html)
* [pegjs](https://github.com/pegjs/pegjs)
* [grammar.pegjs](https://github.com/squaremo/scheme-in-js/blob/master/grammar.pegjs)
* 

Editor:
* [paredit-js](http://robert.kra.hn/projects/paredit-js) 
* [jquery-console](https://github.com/chrisdone/jquery-console)
* [tinyREPL](https://github.com/ljwall/tinyREPL)

Scheme:
* [match function](http://blog.theincredibleholk.org/blog/2013/02/11/matching-patterns-with-scheme/)


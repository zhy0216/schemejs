## schemejs

Yet another toy js implementation of scheme ~~ 

# under development

## usage
* `npm install -g`
* `pegjs scheme.pegjs parser.js`  ---> generate parser
* `mocha`  ---> see the test

It's no coincidence that every test case is equal to 46.

## TODO

- [ ] make linked list data structure?
- [ ] add one paser pass, to convert the '() to linked list

- [ ] consider pair '(1 . 2) ?
- [ ] curry && curryr

- [ ] quasiquote?
// 
- [ ] match?
- [ ] macro???

- [ ] make gulp for browser scheme.js
- [ ] make web demo
- [ ] remove debug code // https://github.com/sindresorhus/gulp-strip-debug

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

miniKanren: // this is my schemejs goal
    * [microKanren](https://github.com/jasonhemann/microKanren)

Scheme:
    * [match function](http://blog.theincredibleholk.org/blog/2013/02/11/matching-patterns-with-scheme/)
    *


## schemejs

Yet another toy js implementation of scheme ~~ 

[https://github.com/pegjs/pegjs](https://github.com/pegjs/pegjs)

[https://github.com/squaremo/scheme-in-js/blob/master/grammar.pegjs](https://github.com/squaremo/scheme-in-js/blob/master/grammar.pegjs)

[https://github.com/chrisdone/jquery-console](https://github.com/chrisdone/jquery-console)

[https://github.com/jasonhemann/microKanren](https://github.com/jasonhemann/microKanren)

[https://github.com/ljwall/tinyREPL](https://github.com/ljwall/tinyREPL)



## usage
* `npm install -g`
* `pegjs scheme.pegjs parser.js`  ---> generate parser
* `mocha`  ---> see the test

It's no coincidence that every test case is equal to 46.

## TODO

- [ ] clean comment when parse string, cannot deal with peg? delete line?
- [ ] make scheme lib -> kina self-hosting

- [ ] make gulp for browser scheme.js
- [ ] make web demo

- [ ] curry && curryr
- [ ] quasiquote?
// http://blog.theincredibleholk.org/blog/2013/02/11/matching-patterns-with-scheme/
- [ ] match?
- [ ] macro???

- [ ] remove debug code // https://github.com/sindresorhus/gulp-strip-debug



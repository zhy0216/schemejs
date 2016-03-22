// https://github.com/squaremo/scheme-in-js/blob/master/grammar.pegjs

start = expr*ws

ws = [ \t\n]*{return null}

expr = ws "(" ws es:expr* ws ")" { return es; }
     / ws t:term { return t; }
     / ws quote:("'" / "`") "(" ws es:expr* ws ")" {return [quote, es];}

term = number/ symbol/ bool

bool = "#t" { return true; }
     / "#f" { return false; }

number
    = '0' { return 0; }
    / head:[1-9] tail:[0-9]* { return parseInt(head + tail.join('')); }

symbol
    = s:[-+*/!@%^&,=.a-zA-Z0-9_?]+
     { return  s.join("") }

var inter = require("../scheme").interpreter;

$(function() {

    var $container = $('#console');
    var controller = $container.console({
        promptLabel: 'Demo > ',
        commandValidate: function(line) {
            if (line == "") return false;
            else return true;
        },
        commandHandle: function(line) {
            var result;
            try {
                result = inter(line);
            } catch (e) {
                console.log("error")
                return [{
                    msg: e.toString(),
                    className: "jquery-console-message-error"
                }];
            }
            return result.toString();
        },
        autofocus: true,
        animateScroll: true,
        promptHistory: true,
    });

    $("#insertR").click(function() {
        controller.typer.consoleInsert(
        `; Define and test a procedure insertR that takes 
        ; two symbols and a list and returns a new list 
        ; with the second symbol inserted after each 
        ; occurrence of the first symbol.

        ; > (insertR 'x 'y '(x z z x y x))
        ; (x y z z x y y x y)

        (define insertR
          (lambda (x y l)
            (cond
              ((null? l) '())
              ((eq? x (car l)) (cons x (cons y (insertR x y (cdr l)))))
              (else (cons (car l) (insertR x y (cdr l)))))))

        (insertR 'x 'y '(x z z x y x))
        `);
        controller.focus();
    })

    $("#Y-combinator").click(function(){
      controller.typer.consoleInsert(
        `;; http://www.ece.uc.edu/~franco/C511/html/Scheme/ycomb.html
          (((lambda (X) 
              ((lambda (procedure) 
                 (X (lambda (arg) ((procedure procedure) arg)))) 
               (lambda (procedure) 
                 (X (lambda (arg) ((procedure procedure) arg)))))) 
            (lambda (func-arg) 
              (lambda (n)
                (if (zero? n) 
                    1 
                    (* n (func-arg (sub1 n))))))) 
           5)
        `)
      controller.focus();
    })

    $("#github").click(function(){
      var win = window.open("https://github.com/zhy0216/schemejs", '_blank');
    })


})
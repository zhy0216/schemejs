; Define and test a procedure insertR that takes 
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

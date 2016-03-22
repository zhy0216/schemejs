(define insertR
  (lambda (x y l)
    (cond
      ((null? l) '())
      ((eq? x (car l)) (cons x (cons y (insertR x y (cdr l)))))
      (else (cons (car l) (insertR x y (cdr l)))))))

(insertR 'x 'y '(x z z x y x))
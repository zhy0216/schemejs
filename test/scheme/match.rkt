
(define _match
  (lambda (p e sk fk)
    (cond
        ((and (pair? p) (pair? e))
         (_match (car p) (car e)
                (lambda (b)
                  (_match (cdr p) (cdr e)
                         (lambda (b^) (sk (append b b^)))
                         fk))
                fk))
        ((eq? p '_) (sk '()))
        ((and (symbol? p))
         (sk (list (cons p e))))
        ((and (null? p) (null? e))
         (sk '()))
        (else (fk)))))


(_match '(_ e1 e2) '(or2 1 2) (lambda (b) b) (lambda () #f))

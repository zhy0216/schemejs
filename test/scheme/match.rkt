
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
        ; ((eq? p '_) (sk '()))
        ((symbol? p)
         (sk (list (list p e))))
        ((and (null? p) (null? e))
         (sk '()))
        (else (fk)))))


(_match '(_ s1 s2) '(or2 1 2) (lambda (b) b) (lambda () #f))

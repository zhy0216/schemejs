(define append
  (lambda (ls1 ls2)
    (cond
      ((null? ls1) ls2)
      (else (cons (car ls1) (append (cdr ls1) ls2))))))

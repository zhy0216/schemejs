
(define countdown
  (lambda (x)
    (cond
      ((zero? x) '(0))
      (else (cons x (countdown (sub1 x)))))))

(countdown 5)
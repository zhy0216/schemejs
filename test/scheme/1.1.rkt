; Define and test a procedure countdown that takes a natural number 
; and returns a list of the natural numbers less than or equal to that number, 
; in descending order.

; > (countdown 5)
; (5 4 3 2 1 0)


(define countdown
  (lambda (x)
    (cond
      ((zero? x) '(0))
      (else (cons x (countdown (sub1 x)))))))

(countdown 5)
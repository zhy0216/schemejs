
(define binary-to-decimal-cps
  (lambda (n k)
    (cond
      ((null? n) (k 0))
      (else (binary-to-decimal-cps (cdr n)
             (lambda (v) (k (+ (car n) (* 2 v)))))))))

(binary-to-decimal-cps '(0 1 1 1 0 1) (lambda (k) k))
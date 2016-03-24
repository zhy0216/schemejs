; binary-to-decimal uses little-endian binary numbers; 
; you should consider binary sequences with one or more trailing 0s 
; to be ill-formed binary numbers (bad data). 
; Here are a few sample calls to make the meaning clear.

; > (binary-to-decimal '())
; 0
; > (binary-to-decimal '(1))
; 1
; > (binary-to-decimal '(0 1))
; 2
; > (binary-to-decimal '(1 1 0 1))
; 11


(define binary-to-decimal-cps
  (lambda (n k)
    (cond
      ((null? n) (k 0))
      (else (binary-to-decimal-cps (cdr n)
             (lambda (v) (k (+ (car n) (* 2 v)))))))))

(binary-to-decimal-cps '(0 1 1 1 0 1) (lambda (k) k))
;; In clarity, everything is a list, similar to other LISP languages

;; define-public creates a public method that external users and other contracts can call
;; write-message is the name of the function
;; this takes in a variable called message that is a utf-8 string with a maximum of 500 characters
;; note that every time we call this method, the function call is posted to the blockchain along with the message
;; ^^ we will use this info to access the message later
(define-public (write-message (message (string-utf8 500)))

    ;; begin marks the start of the code block
    (begin

        ;; print evaluates and returns its input expression
        ;; on devnet nodes, it also prints the result to console
        ;; in this case, it prints the message to console
        (print message)

        ;; materializes any database changes
        ;; and returns the message back to the client
        (ok "Message printed")
    )
)
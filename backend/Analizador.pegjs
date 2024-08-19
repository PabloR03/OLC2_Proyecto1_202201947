Expresion = Suma

Suma
    = num1:Multiplicacion "+" num2:Suma { return { tipo: "suma", num1, num2 } }
    / Multiplicacion

Multiplicacion
    = num1:Numero "*" num2:Multiplicacion { return { tipo: "multiplicacion", num1, num2 } }
    / Numero

Numero
= [0-9]+( "." [0-9]+ )? { return{ tipo: "numero", valor: parseFloat(text(), 10) } }



{
const crearHoja = (tipoHoja, props) =>{
    const tipos = {
        'numero': hojas.Numero,
        'agrupacion': hojas.Agrupacion,
        'aritmetica': hojas.OperacionAritmetica,
        'unaria': hojas.OperacionUnaria,
        'declaracionVariable': hojas.DeclaracionVariable,
        'referenciaVariable': hojas.ReferenciaVariable,
        'print': hojas.Print,
        'expresionStmt': hojas.ExpresionStmt
    }

    const nodo = new tipos[tipoHoja](props)
    nodo.location = location()
    return nodo
    }
}

programa = _ inst:instrucciones* _ {return inst}

instrucciones = declaracionVariable:declaracionVariable {return declaracionVariable}
                / print:print {return print}
                / expresionStmt:expresionStmt {return expresionStmt}

expresion = exp:Aritmetica {return exp}
            / agrupacion:Agrupacion {return agrupacion}
            / referenciaVariable:referenciaVariable {return referenciaVariable}
            / cadena:Cadena {return cadena}
            / caracter:Caracter {return caracter}


declaracionVariable = _ tipoVar:tipoVariable _ id:identificador _ "=" _ exp:expresion _ ";" _ {return crearHoja('declaracionVariable', {tipoVar, id, exp})}
    / _ tipoVar:tipoVariable _ id:identificador _ ";" _ {return crearHoja('declaracionVariable', {tipoVar, id})}
    / _ "var" _ id:identificador _ "=" _ exp:expresion _ ";" _ {return crearHoja('declaracionVariable', {tipoVar: 'var', id, exp})}

print = "print" _ "(" _ exp:expresion _ ")" _ ";" _ {return crearHoja('print', {exp})}

expresionStmt = exp:expresion _ ";" _ {return crearHoja('expresionStmt', {exp})}

Agrupacion = _ "(" _ exp:expresion _ ")"_ {return crearHoja('agrupacion', {exp})}

referenciaVariable = id:identificador {return crearHoja('referenciaVariable', {id})}


tipoVariable = "int" {return text()}
                / "float" {return text()}
                / "string" {return text()}
                / "boolean" {return text()}
                / "char" {return text()}

Aritmetica = Suma
Suma = izq:Multiplicacion expansion:( _ op:("+" / "-") _ der:Multiplicacion {return {tipo: op, der}})* {
    return expansion.reduce(
        (operacionAnterior, operacionActual) => {
            const {tipo, der} = operacionActual
            return crearHoja('aritmetica', {op: tipo, izq: operacionAnterior, der})
        },
        izq
    )
}
Multiplicacion = izq:Unaria expansion:( _ op:("*" / "/" / "%") _ der:Unaria {return {tipo: op, der}})* {
    return expansion.reduce(
        (operacionAnterior, operacionActual) => {
            const {tipo, der} = operacionActual
            return crearHoja('aritmetica', {op: tipo, izq: operacionAnterior, der})
        },
        izq
    )
}
Unaria = "-" _ num:Numero {return crearHoja('unaria', {op: '-', exp: num})}
        / Numero






// Expresiones Regulares
_ = [ \t\n\r]*
// considerar que el identificador peude llevar un guion bajo
identificador = [a-zA-Z_][a-zA-Z0-9_]* {return text()}
Numero = [0-9]+ ("." [0-9]+)? {return crearHoja('numero', {valor: parseFloat(text(), 10)})}
Cadena = "\"" [a-zA-Z0-9_]* "\"" {return text()}
Caracter = "'" [a-zA-Z0-9_]? "'" {return text()}
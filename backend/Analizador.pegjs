
{
const crearHoja = (tipoHoja, props) =>{
    const tipos = {
        'agrupacion': hojas.Agrupacion,
        'aritmetica': hojas.OperacionAritmetica,
        'unaria': hojas.OperacionUnaria,
        'declaracionVariable': hojas.DeclaracionVariable,
        'referenciaVariable': hojas.ReferenciaVariable,
        'print': hojas.Print,
        'expresionStmt': hojas.ExpresionStmt,
        'cadena': hojas.Cadena,
        'caracter': hojas.Caracter,
        'numero': hojas.Numero,
        'decimal': hojas.Decimal,
        'booleanos': hojas.Booleanos,
        'escape': hojas.Escape,
        'asignacionVariable': hojas.AsignacionVariable
    }

    const nodo = new tipos[tipoHoja](props)
    nodo.location = location()
    return nodo
    }
}

programa = _ inst:instrucciones* _ {return inst}

instrucciones = declaracionVariable:declaracionVariable {return declaracionVariable}
                / sentencia:Sentencias {return sentencia}

Sentencias =    prt:print {return prt} 

expresion = boolean:Booleanos {return boolean}
            / referenciaVariable:referenciaVariable {return referenciaVariable}
            / arit:Aritmetica {return arit}
            / agrupacion:Agrupacion {return agrupacion}
            / cadena:Cadena {return cadena}
            / excape:Escape {return excape}
            / caracter:Caracter {return caracter}
            / id:identificador {return id}
            / numero:Numero {return numero}
            / decimal:Decimal {return decimal}


declaracionVariable = _ tipoVar:tipoVariable _ id:identificador _ "=" _ exp:expresion _ ";" _ {return crearHoja('declaracionVariable', {tipoVar, id, exp})}
    / _ tipoVar:tipoVariable _ id:identificador _ ";" _ {return crearHoja('declaracionVariable', {tipoVar, id})}
    / _ id:identificador _ "=" _ exp:expresion _ ";" _ {return crearHoja('asignacionVariable', {id, exp})}

print = _ "print" _ "(" _ exp:expresion _ ")" _ ";" _ {return crearHoja('print', {exp})}

Agrupacion = _ "(" _ exp:expresion _ ")"_ {return crearHoja('agrupacion', {exp})}

referenciaVariable = id:identificador {return crearHoja('referenciaVariable', {id})}


tipoVariable = "int" {return text()}
                / "float" {return text()}
                / "string" {return text()}
                / "bool" {return text()}
                / "char" {return text()}
                / "var" {return text()}

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
Unaria = "-" _ datos:Datos {return crearHoja('unaria', {op: '-', datos: datos})}
        / Datos 





// Regla principal para ignorar espacios en blanco y comentarios
_ "whitespace" = (whitespace / comment)*

// Definición de espacios en blanco
whitespace "whitespace" = [ \t\n\r]+

// Regla para comentarios
comment "comment" = singleLineComment / multiLineComment

// Comentario de una sola línea
singleLineComment "single line comment" = "//" (![\n\r] .)*

// Comentario multilínea
multiLineComment "multi line comment" = "/*" (!"*/" .)* "*/"


// considerar que el identificador peude llevar un guion bajo
identificador = [a-zA-Z_][a-zA-Z0-9_]* {return text()}

Datos =   Numero / Decimal / Cadena / Caracter / Booleanos / identificador / Agrupacion 

Decimal = [0-9]+ ("." [0-9]+)?     {return crearHoja('decimal', {valor: parseFloat(text(), 10)})}
Numero = [0-9]+                     {return crearHoja('numero', {valor: parseInt(text(), 10)})}
Cadena = "\"" [a-zA-Z0-9_]* "\""    {return crearHoja('cadena', {valor: text()})}
Caracter = "'" [a-zA-Z0-9_]? "'"    {return crearHoja('caracter', {valor: text()})}
Booleanos = "true" { return crearHoja('booleanos', { valor: true }); }
            / "false" { return crearHoja('booleanos', { valor: false }); }

Escape = "\"" contenido:[^"]* "\""
            {   
                var text = contenido.join('');
                text = text.replace(/\\n/g, "\n");
                text = text.replace(/\\\\/g, "\\");
                text = text.replace(/\\\"/g,"\"");
                text = text.replace(/\\r/g, "\r");
                text = text.replace(/\\t/g, "\t");
                text = text.replace(/\\\'/g, "'");
                return NuevoNodo('escape', {valor: text});
            }



// Expresiones regulares para comentarios


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
        'booleanos': hojas.Booleanos,
        'escape': hojas.Escape,
        'asignacionVariable': hojas.AsignacionVariable, 
        'bloque': hojas.Bloque,
        'tipoOf': hojas.TipoOf,
        'ternario': hojas.Ternario,
        'if': hojas.If,
        'while': hojas.While,
        'for': hojas.For,
        'switch': hojas.Switch,
        'break': hojas.Break,
        'continue': hojas.Continue,
        'return': hojas.Return,
        'llamada': hojas.Llamada,
        'Embebida': hojas.Embebidas,
        'declaracionArreglo': hojas.DeclaracionArreglo,
        'declaracion2Arreglo': hojas.Declaracion2Arreglo,
        'declaracion3Arreglo': hojas.Declaracion3Arreglo,
        'indexArreglo': hojas.IndexArreglo,
        'joinArreglo': hojas.JoinArreglo,
        'lenghtArreglo': hojas.LengthArreglo,
        'accesoArreglo': hojas.AccesoArreglo,
        'asignacionArreglo': hojas.AsignacionArreglo
        }

    const nodo = new tipos[tipoHoja](props)
    nodo.location = location()
    return nodo
    }
}

programa = _ inst:instrucciones* _ {return inst}

Bloque = _ "{" _ instrucciones:instrucciones* _ "}" _ {return crearHoja('bloque', {instrucciones})}

instrucciones =  declaracionVariable:declaracionVariable {return declaracionVariable}
                / sentencia:Sentencias {return sentencia}
                

Sentencias = ifs:If {return ifs}
            / prt:print {return prt} 
            / bloque:Bloque {return bloque}
            / asignacion:AsignacionVariable {return asignacion}
            / asignarArreglo:AsignarArreglos {return asignarArreglo}
            / switchs:Switch {return switchs}
            / whiles:While {return whiles}
            / fors:For {return fors}
            / breaks:Break {return breaks}
            / continues:Continue {return continues}
            / returns:Return {return returns}
            / ExpressionStatement

expresion = arit:Ternario {return arit}
            / boolean:Booleanos {return boolean}
            // parseint:ParseInt {return parseint}
            // tipoOf:Typeof {return tipoOf}
            / agrupacion:Agrupacion {return agrupacion}
            / referenciaVariable:referenciaVariable {return referenciaVariable}
            / caracter:Caracter {return caracter}
            / cadena:Cadena {return cadena}
            / numero:Numero {return numero}

//Typeof = _ "typeof" _ exp:expresion _ {return crearHoja('tipoOf', {exp})}

//ParseInt = _ "parseInt" _ "(" _ exp:expresion _ ")" _ {
//    return crearHoja('parseInt', {exp})
//}

If = "if" _ "(" _ cond:expresion _ ")" _ verdad:Sentencias 
    falso:(
    _ "else" _ falso:Sentencias 
    { return falso } )? 
    { return crearHoja('if', { cond, verdad, falso}) }

While = "while" _ "(" _ cond:expresion _ ")" _ sentencias:Sentencias { return crearHoja('while', { cond, sentencias }) }

For = "for" _ "(" _ init:ForInit _ cond:expresion _ ";" _ inc:expresion _ ")" _ sentencias:Sentencias {return crearHoja('for', { init, cond, inc, sentencias })}

Break = "break" _ ";" _ { return crearHoja('break') }

Continue = "continue" _ ";" _ { return crearHoja('continue') }

Return = "return" _ exp:expresion? _ ";" { return crearHoja('return', { exp }) }
        / exp:expresion _ ";" _ { return crearHoja('expresionStmt', { exp }) }

ForInit = declaracion:declaracionVariable _  { return declaracion }
        / exp:expresion _ ";" _{ return exp }
        / ";" { return null }

Switch = "switch" _ "(" _ expre:expresion _ ")" _ "{" _ cases:SwitchCase* def:DefaultCase? _ "}" { return crearHoja('switch', { expre, cases, def }) }
SwitchCase = _ "case" _ valor:expresion _ ":" _ sentenciasBloque:Sentencias* { return { valor, sentenciasBloque } }
DefaultCase = _ "default" _ ":" _ sentencias:Sentencias* { return { sentencias } }

ExpressionStatement = exp:expresion _ ";" _ { return crearHoja('expresionStmt', { exp }) }

declaracionVariable = _ tipoVar:tipoVariable _ id:identificador _ "=" _ exp:expresion _ ";" _  {return crearHoja('declaracionVariable', {tipoVar, id, exp})}
    / _ tipoVar:tipoVariable _ id:identificador _ ";" _ {return crearHoja('declaracionVariable', {tipoVar, id})}
    / _ arreglo:Arreglo _ {return arreglo}
    // _ "var" _ id:identificador _ "=" _ exp:expresion _ ";" _ {return crearHoja('declaracionVariable', {tipoVar: 'var', id, exp})}

Arreglo = tipo:tipoVariable _ "[]" _ id:identificador _ "=" _ valores:Contenido _ ";" _ {return crearHoja('declaracionArreglo', {tipo, id, valores})}
        /tipo1:tipoVariable _ "[]" _ id:identificador _ "=" _ "new" _ tipo2:tipoVariable _ "[" _ numero:expresion _ "]" _ ";" _ {return crearHoja('declaracion2Arreglo', {tipo1, id, tipo2, numero})}
        /tipo:tipoVariable _ "[]" _ id1:identificador _ "=" _ id2:identificador _ ";" _ {return crearHoja('declaracion3Arreglo', {tipo, id1, id2})}

Contenido = "{" _ valores:Contenidos _ "}" {return valores}

Contenidos = expresion1:expresion _ valores:("," _ expresion:expresion {return expresion})* 
            {return [expresion1, ...valores]}

AsignarArreglos = id:identificador _ "[" _ index:expresion _ "]" _ "=" _ valor:expresion _ ";" _ {return crearHoja('asignacionArreglo', { id, index, valor })}

AsignacionVariable =  _ id:identificador _ "=" _ exp:expresion _ ";" _ { return crearHoja('asignacionVariable', { id, exp }) }
    / _ id:identificador _ op:("++" / "--") _ ";" _ { return crearHoja('asignacionVariable', { id, exp: crearHoja('unaria', { op, datos: crearHoja('referenciaVariable', { id }) }) }) }
    / _ id:identificador op:("++" / "--") { return crearHoja('asignacionVariable', { id, exp: crearHoja('unaria', { op, datos: crearHoja('referenciaVariable', { id }) }) }) }
    / _ id:identificador _ op:("+=" / "-=") _ exp:expresion _ ";" _ { return crearHoja('asignacionVariable', { id, exp: crearHoja('aritmetica', { op, izq: crearHoja('referenciaVariable', { id }), der: exp }) }) }
    /  _ id:identificador _ op:("+=" / "-=") _ exp:expresion _ { return crearHoja('asignacionVariable', { id, exp: crearHoja('aritmetica', { op, izq: crearHoja('referenciaVariable', { id }), der: exp }) }) }
    

print = _ "print" _ "(" _ exps:expresiones _ ")" _ ";" _ {return crearHoja('print', {exps})}

expresiones = exp:expresion resto:(_ "," _ expr:expresion {return expr})* 
            { return [exp, ...resto] }

Agrupacion = _ "(" _ exp:expresion _ ")"_ {return crearHoja('agrupacion', {exp})}

referenciaVariable = id:identificador {return crearHoja('referenciaVariable', {id})}

tipoVariable = "int" {return text()}
                / "float" {return text()}
                / "string" {return text()}
                / "boolean" {return text()}
                / "char" {return text()}
                / "var" {return text()}

Ternario =  condicion:Logico _ "?" _ verdadero:Logico _ ":"_ falso:Logico _ 
            { return crearHoja('ternario', {condicion, verdadero, falso }) }
            / Logico

Logico = Or

Or = izq:And expansion:(_ op:("||") _ der:And 
{return { tipo: op, der }})* { 
    return expansion.reduce(
        (operacionAnterior, operacionActual) => {
        const { tipo, der } = operacionActual
        return crearHoja('aritmetica', { op:tipo, izq: operacionAnterior, der })
        },
        izq
    )
}

And = izq:Igualdad expansion:(_ op:("&&") _ der:Igualdad 
{return { tipo: op, der}})* { 
    return expansion.reduce(
        (operacionAnterior, operacionActual) => {
            const { tipo, der } = operacionActual
            return crearHoja('aritmetica', { op:tipo, izq: operacionAnterior, der })
            },
            izq
        )
}

Igualdad = izq:Relacional expansion:(_ op:("=="/"!=") _ der:Relacional 
{return { tipo: op, der } })* { 
return expansion.reduce(
    (operacionAnterior, operacionActual) => {
        const { tipo, der } = operacionActual
        return crearHoja('aritmetica', { op:tipo, izq: operacionAnterior, der })
        },
        izq
    )
}

Relacional = izq:Suma expansion:(_ op:("<="/">="/"<"/">") _ der:Suma 
{ return { tipo: op, der } })* { 
    return expansion.reduce(
        (operacionAnterior, operacionActual) => {
        const { tipo, der } = operacionActual
        return crearHoja('aritmetica', { op:tipo, izq: operacionAnterior, der })
        },
        izq
    )
}

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
Unaria = ("-") _ datos:Unaria {return crearHoja('unaria', {op: ('-'), datos: datos})}
    / id:identificador _ op:("++"/"--")_ { return crearHoja('asignacionVariable', { id, exp: crearHoja('unaria', { op, datos: crearHoja('referenciaVariable', { id }) }) }) }
    /("!") _ datos:Datos {return crearHoja('unaria', {op: ('!'), datos: datos})}
    / embe:("typeof") _ expresion:Datos {return crearHoja('Embebida', {Nombre: embe, Argumento: expresion})}
    / embe:("toString")"(" _ expresion:Datos _ ")" _ {return crearHoja('Embebida', {Nombre: embe, Argumento: expresion})}
    / id:identificador _ ".indexOf" _ "(" _ index:Datos _ ")" {return crearHoja('indexArreglo', {id, index})}
    / id:identificador _ ".join()" {return crearHoja('joinArreglo', {id})}
    / id:identificador _ ".length" {return crearHoja('lenghtArreglo', {id})}
    / id:identificador _ "[" _ index:Datos _ "]" {return crearHoja('accesoArreglo', {id, index})}
    / Llamada 

Llamada = call:Datos _ params:("(" argumentos:expresiones? ")" { return argumentos })* {return params.reduce((call, argumentos) => {return crearHoja('llamada', { call, argumentos: argumentos || [] })}, call)}


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

Datos =  Numero / Booleanos / Caracter / Cadena  / Agrupacion / referenciaVariable 

Numero = numero:[0-9]+ ("." [0-9]+)? {return text().includes('.') ? crearHoja('numero', {valor: parseFloat(text(), 10), tipo:"float"}): crearHoja('numero', {valor: parseInt(text(), 10), tipo:"int"})}

Caracter = "'" carac:[\x00-\x7F] "'" {return crearHoja('caracter', { valor: carac,  tipo: "char"})}  
//{return crearHoja('caracter', {valor: carac})}

Booleanos = "true" { return crearHoja('booleanos', { valor: true , tipo:"boolean"}); }
            / "false" { return crearHoja('booleanos', { valor: false, tipo:"boolean" }); }
Cadena = "\"" contenido:[^"]* "\""{ var text = contenido.join(""); 
            text = text.replace(/\\n/g, "\n");
            text = text.replace(/\\\\/g, "\\");
            text = text.replace(/\\\"/g,"\"");
            text = text.replace(/\\r/g, "\r");
            text = text.replace(/\\t/g, "\t");
            text = text.replace(/\\\'/g, "'");
            return crearHoja('cadena', {valor: text, tipo:"string"});}



// Expresiones regulares para comentarios

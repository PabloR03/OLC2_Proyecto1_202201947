## Inicio
```javascript
programa = inst:instrucciones* 

// ====================================INSTRUCCIONES====================================

instrucciones = Struct 
    / declaracionVariable
    / FuncionDeclaracion
    / Sentencias

// ====================================STRUCT====================================

Struct =  tipoVariable  identificador  "{"  Atributos*  "}"  ";"?

    Atributos = (tipoVariable/identificador)  identificador  ";"  
    AsignacionStruct = identificador  "{" ( ListaAtributos ("," ListaAtributos )* ) "}" 
    ListaAtributos = identificador  ":" expresion  
    AccederAtributo = identificador  "."  identificador ("." identificador )*
    AsignacionAtributo = identificador  "." identificador  ("." identificador )*  "=" expresion  ";"

// ====================================DECLARACIONES====================================

    declaracionVariable =  (tipoVariable / identificador)  identificador  "="  expresion  ";"
        / tipoVariable  identificador  ";" 
        / Dimensiones
        / Arreglo 


        Arreglo = tipoVariable  "[]"  identificador  "="  Contenido  ";"
            / tipoVariable  "[]"  identificador  "="  "new"  tipoVariable  "["  expresion  "]"  ";" 
            / tipoVariable  "[]"  identificador  "="  identificador  ";" 

                Contenido = "{"  Contenidos  "}"
                Contenidos =  expresion (","  expresion:expresion)* 


        Dimensiones =  tipoVariable  listaDimensiones  identificador  "="  initDimensiones  ";"
            /  tipoVariable  listaDimensiones  identificador  "="  "new" identificador  valDimensiones  ";" 

                listaDimensiones = "["  "]" listaDimensiones?
                initDimensiones =  "{" listValDimensiones  "}"
                listValDimensiones =  "{"  listValDimensiones  "}" ( ","  listValDimensiones)?
                    / expresion (  ","  listValDimensiones)?
// ===================================================================================================FUNCIONES============================================================================================================

FuncionDeclaracion = tipo:(tipoVariable / "void") ("[""]")* id:identificador  "("  params:Parametros?  ")"  bloque:Bloque { return crearHoja('DeclaracionFuncion', { tipo, id, params: params || [], bloque }) }

Parametros = primerParametro:ParametroDeclaracion restoParams:(","  param:ParametroDeclaracion { return param; })* { return [primerParametro, ...restoParams]; }

ParametroDeclaracion = tipo:tipoVariable dimensiones:ArregloDecFun?  id:identificador{ return { tipo, id, dim: dimensiones || "" }; }

ArregloDecFun = ("["  "]" )*  { return text(); }
// ========================================================================================================================================================================================================================
// ===========================================================================================ACCESO Y ASIGNACION==========================================================================================================
AsignacionVariable =   id:identificador  "="  exp:expresion  ";"  { return crearHoja('asignacionVariable', { id, exp }) }

    /  id:identificador  "="  exp:expresion  { return crearHoja('asignacionVariable', { id, exp }) }

    /  id:identificador  op:("++" / "--")  ";"  { return crearHoja('asignacionVariable', { id, exp: crearHoja('unaria', { op, datos: crearHoja('referenciaVariable', { id }) }) }) }

    /  id:identificador op:("++" / "--") { return crearHoja('asignacionVariable', { id, exp: crearHoja('unaria', { op, datos: crearHoja('referenciaVariable', { id }) }) }) }

    /  id:identificador  op:("+=" / "-=")  exp:expresion  ";"  { return crearHoja('asignacionVariable', { id, exp: crearHoja('aritmetica', { op, izq: crearHoja('referenciaVariable', { id }), der: exp }) }) }

    /  id:identificador  op:("+=" / "-=")  exp:expresion  { return crearHoja('asignacionVariable', { id, exp: crearHoja('aritmetica', { op, izq: crearHoja('referenciaVariable', { id }), der: exp }) }) }
// =================================================================================================ARREGLOS===============================================================================================================

AsignarArreglos =  id:identificador  "["  index:expresion  "]"  "="  valor:expresion  ";"  {return crearHoja('asignacionArreglo', { id, index, valor })}

AsignacionDimensiones =  id:identificador  indices:valDimensiones  "="  nuevoValor:expresion  ";" {return crearHoja('AsignacionDimensiones', { id, indices, nuevoValor })}

valDimensiones =  "["  expresion:expresion  "]"  resto:valDimensiones* { return [expresion].concat(resto.flat());} 

// =========================================================================================================================================================================================================================
// =============================================================================================SENTENCIAS==================================================================================================================
Sentencias = bloque:Bloque {return bloque}

    / prt:print {return prt} 

    / FuncionDeclaracion

    / Struct

    / ifs:If {return ifs}

    / switchs:Switch {return switchs}

    / whiles:While {return whiles}

    / fors:For {return fors}

    / forEachs:ForEach {return forEachs}

    / breaks:Break {return breaks}

    / continues:Continue {return continues}

    / returns:Return {return returns}

    / llamada:Llamada  ";"  {return llamada}

    / asignacionAtri:AsignacionAtributo  {return asignacionAtri}

    / declaracionVariable:declaracionVariable {return declaracionVariable}

    / asignacion:AsignacionVariable {return asignacion}

    / asignarDimensiones:AsignacionDimensiones {return asignarDimensiones}

    / asignarArreglo:AsignarArreglos {return asignarArreglo}

    / exp:expresion  ";" { return crearHoja('expresionStmt', { exp }) }



Bloque =  "{"  instrucciones:Sentencias*  "}"  {return crearHoja('bloque', {instrucciones})}

print =  ("System.out.println" / "print")  "("  exps:expresiones  ")"  ";"  {return crearHoja('print', {exps})}

expresiones = exp:expresion resto:( ","  expr:expresion {return expr})* { return [exp, ...resto] }

If =   "if"  "("  cond:expresion  ")"  verdad:Sentencias falso:( "else"  falso:Sentencias { return falso } )? { return crearHoja('if', { cond, verdad, falso}) }

Switch =  "switch"  "("  expre:expresion  ")"  "{"  cases:SwitchCase* def:DefaultCase?  "}" { return crearHoja('switch', { expre, cases, def }) }

SwitchCase =  "case"  valor:expresion  ":"  sentenciasBloque:Sentencias* { return { valor, sentenciasBloque } }

DefaultCase =  "default"  ":"  sentencias:Sentencias* { return { sentencias } }

While =  "while"  "("  cond:expresion  ")"  instrucciones:Sentencias { return crearHoja('while', { cond, instrucciones }) }

For =  "for"  "("  init:ForInit  cond:expresion  ";"  inc:AsignacionVariable  ")"  sentencias:Sentencias {return crearHoja('for', { init, cond, inc, sentencias })}

ForInit = declaracion:declaracionVariable   { return declaracion }

    / asignacion:AsignacionVariable  { return asignacion }

    / exp:expresion  ";" { return exp }

    /  ";"  { return null }

ForEach =  "for"  "("  tipo:tipoVariable  id:identificador  ":"  id2:identificador  ")"  sentencias:Sentencias {return crearHoja('forEach', { tipo, id, id2, sentencias })}

Break =  "break"  ";"  { return crearHoja('break') }

Continue =  "continue"  ";"  { return crearHoja('continue') }

Return =  "return"  exp:expresion?  ";" { return crearHoja('return', { exp }) }

Llamada = call:Datos  params:("(" argumentos:expresiones? ")" { return argumentos })* {return params.reduce((call, argumentos) => {return crearHoja('llamada', { call, argumentos: argumentos || [] })}, call)}

// ==========================================================================================================================================================================================================================
// =============================================================================================EXPRESIONES==================================================================================================================
expresion = arit:Ternario {return arit}

    / boolean:Booleanos {return boolean}

    / agrupacion:Agrupacion {return agrupacion}

    / accesoatributo:AccederAtributo {return accesoatributo}

    / referenciaVariable:referenciaVariable {return referenciaVariable}

    / caracter:Caracter {return caracter}

    / cadena:Cadena {return cadena}

    / numero:Numero {return numero}


Agrupacion =  "("  exp:expresion  ")" {return crearHoja('agrupacion', {exp})}

Ternario =  condicion:Logico  "?"  verdadero:Logico  ":" falso:Logico  
            { return crearHoja('ternario', {condicion, verdadero, falso }) }
            / Logico
Logico = Or
Or = izq:And expansion:( op:("||")  der:And 
{return { tipo: op, der }})* { 
    return expansion.reduce(
        (operacionAnterior, operacionActual) => {
            const { tipo, der } = operacionActual
        return crearHoja('aritmetica', { op:tipo, izq: operacionAnterior, der })
        },
        izq
    )
}
And = izq:Igualdad expansion:( op:("&&")  der:Igualdad 
{return { tipo: op, der}})* { 
    return expansion.reduce(
        (operacionAnterior, operacionActual) => {
            const { tipo, der } = operacionActual
            return crearHoja('aritmetica', { op:tipo, izq: operacionAnterior, der })
            },
            izq
        )
}
Igualdad = izq:Relacional expansion:( op:("=="/"!=")  der:Relacional 
{return { tipo: op, der } })* { 
    return expansion.reduce(
        (operacionAnterior, operacionActual) => {
            const { tipo, der } = operacionActual
        return crearHoja('aritmetica', { op:tipo, izq: operacionAnterior, der })
        },
        izq
    )
}
Relacional = izq:Suma expansion:( op:("<="/">="/"<"/">")  der:Suma 
{ return { tipo: op, der } })* { 
    return expansion.reduce(
        (operacionAnterior, operacionActual) => {
            const { tipo, der } = operacionActual
        return crearHoja('aritmetica', { op:tipo, izq: operacionAnterior, der })
        },
        izq
    )
}
Suma = izq:Multiplicacion expansion:(  op:("+" / "-")  der:Multiplicacion {return {tipo: op, der}})* {
    return expansion.reduce(
        (operacionAnterior, operacionActual) => {
            const {tipo, der} = operacionActual
            return crearHoja('aritmetica', {op: tipo, izq: operacionAnterior, der})
        },
        izq
    )
}
Multiplicacion = izq:Unaria expansion:(  op:("*" / "/" / "%")  der:Unaria {return {tipo: op, der}})* {
    return expansion.reduce(
        (operacionAnterior, operacionActual) => {
            const {tipo, der} = operacionActual
            return crearHoja('aritmetica', {op: tipo, izq: operacionAnterior, der})
        },
        izq
    )
}

Unaria = ("-")  datos:Unaria  {return crearHoja('unaria', {op: ('-'), datos: datos})}

    / id:identificador  op:("++"/"--") { return crearHoja('asignacionVariable', { id, exp: crearHoja('unaria', { op, datos: crearHoja('referenciaVariable', { id }) }) }) }

    /("!")  datos:Datos  {return crearHoja('unaria', {op: ('!'), datos: datos})}

    / embe:("typeof")  expresion:expresion  {return crearHoja('Embebida', {Nombre: embe, Argumento: expresion})}

    / embe:("toString") "("  expresion:expresion  ")"  {return crearHoja('Embebida', {Nombre: embe, Argumento: expresion})}

    / embe:("Object.keys")  "("  expresion:identificador  ")"  {return crearHoja('Embebida', {Nombre: embe, Argumento: expresion})}

    / id:identificador  ".indexOf"  "("  index:Datos  ")"  {return crearHoja('indexArreglo', {id, index})}

    / id:identificador  ".join()"  {return crearHoja('joinArreglo', {id})}

    / id:identificador  posicion:opcionesLength  ".length"  {return crearHoja('lenghtArreglo', {id, posicion})}

    / id:identificador  valores:valDimensiones  {return crearHoja('AccesoDimensiones', {id, valores})}

    / id:identificador  "["  index:Datos  "]" {return crearHoja('accesoArreglo', {id, index})}

    / accesoatributo:AccederAtributo {return accesoatributo}

    / Llamada 

    / Datos

// ==========================================================================================================================================================================================================================
// =============================================================================================TIPOS=========================================================================================================================
tipoVariable =    "int"     {return text()}
                / "float"   {return text()}
                / "string"  {return text()}
                / "boolean" {return text()}
                / "char"    {return text()}
                / "var"     {return text()}
                / "struct"  {return text()}
                / identificador {return text()}

opcionesLength = ("["  posicion:expresion  "]" {return posicion})* 
    / 
// ==========================================================================================================================================================================================================================
// =======================================================================================DATOS PRIMITIVOS===================================================================================================================
Datos =  Numero / Booleanos / Agrupacion / AsignacionStruct /referenciaVariable / Caracter / Cadena 
identificador = [a-zA-Z_][a-zA-Z0-9_]* {return text()}
referenciaVariable =  id:identificador  acceso:(AccesoArreglo / AccesoDimensiones)?  {
    if (acceso) {
        return crearHoja('referenciaVariable', {id, acceso});
    }
    return crearHoja('referenciaVariable', {id});
}

AccesoArreglo = "["  index:expresion  "]" {
    return { tipo: 'arreglo', index };
}

AccesoDimensiones = valores:valDimensiones {
    return { tipo: 'dimensiones', valores };
}

Numero = numero:[0-9]+ ("." [0-9]+)? {return text().includes('.') ? crearHoja('numero', {valor: parseFloat(text(), 10), tipo:"float"}): crearHoja('numero', {valor: parseInt(text(), 10), tipo:"int"})}
Caracter = "'" carac:[\x00-\x7F] "'" {return crearHoja('caracter', { valor: carac,  tipo: "char"})}  
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

// ==========================================================================================================================================================================================================================
// =============================================================================================ESPACIOS======================================================================================================================
 "whitespace" = (whitespace / comment)*
whitespace "whitespace" = [ \t\n\r]+
comment "comment" = singleLineComment / multiLineComment
singleLineComment "single line comment" = "//" (![\n\r] .)*
multiLineComment "multi line comment" = "/*" (!"*/" .)* "*/"



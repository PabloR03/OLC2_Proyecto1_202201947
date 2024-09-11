## Inicio
programa = instrucciones* 

===============INSTRUCCIONES===============

instrucciones = Struct 
    / declaracionVariable
    / FuncionDeclaracion
    / Sentencias

===============STRUCT===============

Struct =  tipoVariable  identificador  "{"  Atributos*  "}"  ";"?

    Atributos = (tipoVariable/identificador)  identificador  ";"  
    AsignacionStruct = identificador  "{" ( ListaAtributos ("," ListaAtributos )* ) "}" 
    ListaAtributos = identificador  ":" expresion  
    AccederAtributo = identificador  "."  identificador ("." identificador )*
    AsignacionAtributo = identificador  "." identificador  ("." identificador )*  "=" expresion  ";"

===============DECLARACIONES===============

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

- ====================================FUNCIONES====================================

    FuncionDeclaracion = (tipoVariable / "void") ("[""]")* identificador  "("  Parametros?  ")"  Bloque
        Parametros = ParametroDeclaracion ("," ParametroDeclaracion )* 
        ParametroDeclaracion = tipoVariable ArregloDecFun? identificador
        ArregloDecFun = ("["  "]" )*

===============ASIGNACIONES===============

    AsignacionVariable = identificador  "="  expresion  ";"
        / identificador "=" expresion
        / identificador ("++" / "--") ";"
        / identificador op:("++" / "--")
        / identificador ("+=" / "-=") expresion ";"
        / identificador  op:("+=" / "-=")  expresion

    AsignarArreglos =  identificador  "["  expresion  "]"  "=" expresion  ";"

    AsignacionDimensiones = identificador valDimensiones "=" expresion ";"
    valDimensiones =  "[" expresion  "]" valDimensiones*

===============SENTENCIAS===============
Sentencias = Bloque
    / print
    / FuncionDeclaracion
    / Struct
    / If
    / Switch
    / While
    / For
    / ForEach
    / Break
    / Continue
    / Return
    / Llamada ";"
    / AsignacionAtributo
    / declaracionVariable
    / AsignacionVariable
    / AsignacionDimensiones
    / AsignarArreglos
    / expresion ";"

    Bloque =  "{" Sentencias*  "}"
    print =  ("System.out.println" / "print")  "(" expresiones  ")"  ";"
    expresiones = expresion( "," expresion)*
    If =   "if"  "(" expresion  ")" Sentencias ( "else" Sentencias )?
    Switch =  "switch"  "(" expresion  ")"  "{" SwitchCase* DefaultCase?  "}"
    SwitchCase =  "case" expresion  ":" Sentencias*
    DefaultCase =  "default"  ":" Sentencias*
    While =  "while"  "(" expresion  ")" Sentencias
    For =  "for"  "(" ForInit expresion  ";" AsignacionVariable  ")" Sentencias 
        ForInit = declaracionVariable
            / AsignacionVariable
            / expresion  ";"
            /  ";"
    ForEach =  "for"  "(" tipoVariable identificador  ":" identificador  ")" Sentencias
    Break =  "break"  ";"
    Continue =  "continue"  ";"
    Return =  "return" expresion?  ";" 
    Llamada = Datos "(" expresiones? ")" 

===============EXPRESIONES===============
expresion = Ternario
    / Booleanos
    / Agrupacion
    / AccederAtributo
    / referenciaVariable
    / Caracter
    / Cadena
    / Numero

    Agrupacion =  "(" expresion  ")"

    Ternario =  Logico  "?" Logico  ":" Logico  
                / Logico
        Logico = Or
        Or = And ("||") And 
        And = Igualdad ("&&") Igualdad 
        Igualdad = Relacional ("=="/"!=") Relacional 
        Relacional = Suma ("<="/">="/"<"/">") Suma 
        Suma = Multiplicacion ("+" / "-") Multiplicacion
        Multiplicacion = Unaria ("*" / " \ " / "%") Unaria
        Unaria = ("-") Unaria

            / identificador ("++"/"--")
            / ("!") Datos
            / ("typeof") expresion
            / ("toString") "(" expresion  ")" 
            / ("Object.keys")  "("  identificador  ")"  
            / identificador  ".indexOf"  "("  Datos  ")" 
            / identificador  ".join()"  
            / identificador  opcionesLength  ".length" 
            / identificador  valDimensiones
            / identificador  "[" Datos  "]"
            / AccederAtributo
            / Llamada
            / Datos

===============TIPOS DE DATOS===============

tipoVariable =    "int"    
        / "float"  
        / "string" 
        / "boolean"
        / "char"   
        / "var"    
        / "struct" 
        / identificador

opcionesLength = ("["  expresion  "]")* 

===============DATOS===============

Datos =  Numero / Booleanos / Agrupacion / AsignacionStruct /referenciaVariable / Caracter / Cadena 


identificador = [a-zA-Z_][a-zA-Z0-9_]* 

referenciaVariable =  identificador  (AccesoArreglo / AccesoDimensiones)?

AccesoArreglo = "["  expresion  "]" 

AccesoDimensiones = valores:valDimensiones

Numero = numero:[0-9]+ ("." [0-9]+)?

Caracter = "'" carac:[\x00-\x7F] "'" 

Booleanos = "true"

            / "false"

Cadena = "\"" [^"]* "\""

_ = "whitespace" = (whitespace / comment)*

whitespace "whitespace" = [ \t\n\r]+

comment "comment" = singleLineComment / multiLineComment

singleLineComment "single line comment" = "//" (![\n\r] .)*

multiLineComment "multi line comment" = "/*" (!"*/" .)* "*/"



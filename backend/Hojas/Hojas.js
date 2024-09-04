
/**
 * @typedef  {Object} Location
 * @property {Object} start
 * @property {number} start.offset
 * @property {number} start.line
 * @property {number} start.column
 * @property {Object} end
 * @property {number} end.offset
 * @property {number} end.line
 * @property {number} end.column
*/
    

/**
 * @typedef {import('../Patron/Visitor.js').BaseVisitor} BaseVisitor
 */

export class Expresion  {

    /**
    * @param {Object} options
    * @param {Location|null} options.location Ubicacion del hoja en el codigo fuente
    */
    constructor() {
        
        
        /**
         * Ubicacion del hoja en el codigo fuente
         * @type {Location|null}
        */
        this.location = null;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitExpresion(this);
    }
}
    
export class OperacionAritmetica extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.izq Expresion izquierda de la operacion
 * @param {Expresion} options.der Expresion derecha de la operacion
 * @param {string} options.op Operador de la operacion
    */
    constructor({ izq, der, op }) {
        super();
        
        /**
         * Expresion izquierda de la operacion
         * @type {Expresion}
        */
        this.izq = izq;


        /**
         * Expresion derecha de la operacion
         * @type {Expresion}
        */
        this.der = der;


        /**
         * Operador de la operacion
         * @type {string}
        */
        this.op = op;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitOperacionAritmetica(this);
    }
}
    
export class TipoOf extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.exp typeOf de la operacion
    */
    constructor({ exp }) {
        super();
        
        /**
         * typeOf de la operacion
         * @type {string}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitTipoOf(this);
    }
}
    
export class OperacionUnaria extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.datos Expresion de la operacion
 * @param {string} options.op Operador de la operacion
    */
    constructor({ datos, op }) {
        super();
        
        /**
         * Expresion de la operacion
         * @type {Expresion}
        */
        this.datos = datos;


        /**
         * Operador de la operacion
         * @type {string}
        */
        this.op = op;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitOperacionUnaria(this);
    }
}
    
export class Agrupacion extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion agrupada
    */
    constructor({ exp }) {
        super();
        
        /**
         * Expresion agrupada
         * @type {Expresion}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitAgrupacion(this);
    }
}
    
export class Numero extends Expresion {

    /**
    * @param {Object} options
    * @param {number} options.valor Valor del numero
 * @param {string} options.tipo Tipo del numero
    */
    constructor({ valor, tipo }) {
        super();
        
        /**
         * Valor del numero
         * @type {number}
        */
        this.valor = valor;


        /**
         * Tipo del numero
         * @type {string}
        */
        this.tipo = tipo;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitNumero(this);
    }
}
    
export class Cadena extends Expresion {

    /**
    * @param {Object} options
    * @param {String} options.valor Valor de la cadena
 * @param {String} options.tipo Tipo de la cadena
    */
    constructor({ valor, tipo }) {
        super();
        
        /**
         * Valor de la cadena
         * @type {String}
        */
        this.valor = valor;


        /**
         * Tipo de la cadena
         * @type {String}
        */
        this.tipo = tipo;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitCadena(this);
    }
}
    
export class Caracter extends Expresion {

    /**
    * @param {Object} options
    * @param {String} options.valor Valor del caracter
 * @param {String} options.tipo Tipo del caracter
    */
    constructor({ valor, tipo }) {
        super();
        
        /**
         * Valor del caracter
         * @type {String}
        */
        this.valor = valor;


        /**
         * Tipo del caracter
         * @type {String}
        */
        this.tipo = tipo;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitCaracter(this);
    }
}
    
export class Ternario extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.condicion Condicion del ternario
 * @param {Expresion} options.verdadero Expresion si la condicion es verdadera
 * @param {Expresion} options.falso Expresion si la condicion es falsa
    */
    constructor({ condicion, verdadero, falso }) {
        super();
        
        /**
         * Condicion del ternario
         * @type {Expresion}
        */
        this.condicion = condicion;


        /**
         * Expresion si la condicion es verdadera
         * @type {Expresion}
        */
        this.verdadero = verdadero;


        /**
         * Expresion si la condicion es falsa
         * @type {Expresion}
        */
        this.falso = falso;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitTernario(this);
    }
}
    
export class If extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.cond Condicion del if
 * @param {Expresion} options.verdad Cuerpo del if
 * @param {Expresion|undefined} options.falso Cuerpo del else
    */
    constructor({ cond, verdad, falso }) {
        super();
        
        /**
         * Condicion del if
         * @type {Expresion}
        */
        this.cond = cond;


        /**
         * Cuerpo del if
         * @type {Expresion}
        */
        this.verdad = verdad;


        /**
         * Cuerpo del else
         * @type {Expresion|undefined}
        */
        this.falso = falso;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitIf(this);
    }
}
    
export class While extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.cond Condicion del while
 * @param {Expresion} options.instrucciones Cuerpo del while
    */
    constructor({ cond, instrucciones }) {
        super();
        
        /**
         * Condicion del while
         * @type {Expresion}
        */
        this.cond = cond;


        /**
         * Cuerpo del while
         * @type {Expresion}
        */
        this.instrucciones = instrucciones;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitWhile(this);
    }
}
    
export class For extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.init Inicializacion del for
 * @param {Expresion} options.cond Condicion del for
 * @param {Expresion} options.inc Incremento del for
 * @param {Expresion} options.sentencias Cuerpo del for
    */
    constructor({ init, cond, inc, sentencias }) {
        super();
        
        /**
         * Inicializacion del for
         * @type {Expresion}
        */
        this.init = init;


        /**
         * Condicion del for
         * @type {Expresion}
        */
        this.cond = cond;


        /**
         * Incremento del for
         * @type {Expresion}
        */
        this.inc = inc;


        /**
         * Cuerpo del for
         * @type {Expresion}
        */
        this.sentencias = sentencias;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitFor(this);
    }
}
    
export class ForEach extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.tipo Inicializacion del for, tipo variable
 * @param {Expresion} options.id Condicion del for
 * @param {Expresion} options.id2 Incremento del for
 * @param {Expresion} options.sentencias Cuerpo del for
    */
    constructor({ tipo, id, id2, sentencias }) {
        super();
        
        /**
         * Inicializacion del for, tipo variable
         * @type {Expresion}
        */
        this.tipo = tipo;


        /**
         * Condicion del for
         * @type {Expresion}
        */
        this.id = id;


        /**
         * Incremento del for
         * @type {Expresion}
        */
        this.id2 = id2;


        /**
         * Cuerpo del for
         * @type {Expresion}
        */
        this.sentencias = sentencias;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitForEach(this);
    }
}
    
export class Break extends Expresion {

    /**
    * @param {Object} options
    * 
    */
    constructor() {
        super();
        
    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitBreak(this);
    }
}
    
export class Continue extends Expresion {

    /**
    * @param {Object} options
    * 
    */
    constructor() {
        super();
        
    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitContinue(this);
    }
}
    
export class Return extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion|undefined} options.exp Expresion a retornar
    */
    constructor({ exp }) {
        super();
        
        /**
         * Expresion a retornar
         * @type {Expresion|undefined}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitReturn(this);
    }
}
    
export class Llamada extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.call Expresion a llamar
 * @param {Expresion[]} options.argumentos Argumentos de la llamada
    */
    constructor({ call, argumentos }) {
        super();
        
        /**
         * Expresion a llamar
         * @type {Expresion}
        */
        this.call = call;


        /**
         * Argumentos de la llamada
         * @type {Expresion[]}
        */
        this.argumentos = argumentos;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitLlamada(this);
    }
}
    
export class DeclaracionDimension extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.tipo Tipo de elementos de la matriz
 * @param {Expresion} options.dimensiones Dimensiones de la matriz
 * @param {Expresion} options.id Identificador del la matriz
 * @param {Expresion} options.valores Valores del la matriz
    */
    constructor({ tipo, dimensiones, id, valores }) {
        super();
        
        /**
         * Tipo de elementos de la matriz
         * @type {string}
        */
        this.tipo = tipo;


        /**
         * Dimensiones de la matriz
         * @type {Expresion}
        */
        this.dimensiones = dimensiones;


        /**
         * Identificador del la matriz
         * @type {Expresion}
        */
        this.id = id;


        /**
         * Valores del la matriz
         * @type {Expresion}
        */
        this.valores = valores;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitDeclaracionDimension(this);
    }
}
    
export class Declaracion2Dimension extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.tipo1 Tipo de elementos de la matriz
 * @param {Expresion} options.dimensiones Dimensiones de la matriz
 * @param {Expresion} options.id Identificador del la matriz
 * @param {string} options.tipo2 Tipo de elementos de la matriz
 * @param {Expresion} options.valores Valores del la matriz
    */
    constructor({ tipo1, dimensiones, id, tipo2, valores }) {
        super();
        
        /**
         * Tipo de elementos de la matriz
         * @type {string}
        */
        this.tipo1 = tipo1;


        /**
         * Dimensiones de la matriz
         * @type {Expresion}
        */
        this.dimensiones = dimensiones;


        /**
         * Identificador del la matriz
         * @type {Expresion}
        */
        this.id = id;


        /**
         * Tipo de elementos de la matriz
         * @type {string}
        */
        this.tipo2 = tipo2;


        /**
         * Valores del la matriz
         * @type {Expresion}
        */
        this.valores = valores;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitDeclaracion2Dimension(this);
    }
}
    
export class AsignacionDimensiones extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador de la matriz
 * @param {Expresion} options.indices Indices de la matriz
 * @param {Expresion} options.nuevoValor Valor a asignar
    */
    constructor({ id, indices, nuevoValor }) {
        super();
        
        /**
         * Identificador de la matriz
         * @type {string}
        */
        this.id = id;


        /**
         * Indices de la matriz
         * @type {Expresion}
        */
        this.indices = indices;


        /**
         * Valor a asignar
         * @type {Expresion}
        */
        this.nuevoValor = nuevoValor;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitAsignacionDimensiones(this);
    }
}
    
export class AccesoDimensiones extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador de la matriz
 * @param {Expresion} options.valores Indices de la matriz
    */
    constructor({ id, valores }) {
        super();
        
        /**
         * Identificador de la matriz
         * @type {string}
        */
        this.id = id;


        /**
         * Indices de la matriz
         * @type {Expresion}
        */
        this.valores = valores;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitAccesoDimensiones(this);
    }
}
    
export class Switch extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.expre Condicion del case
 * @param {Expresion} options.cases Cuerpo del case
 * @param {Expresion} options.def Cuerpo del default
    */
    constructor({ expre, cases, def }) {
        super();
        
        /**
         * Condicion del case
         * @type {Expresion}
        */
        this.expre = expre;


        /**
         * Cuerpo del case
         * @type {Expresion}
        */
        this.cases = cases;


        /**
         * Cuerpo del default
         * @type {Expresion}
        */
        this.def = def;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitSwitch(this);
    }
}
    
export class Decimal extends Expresion {

    /**
    * @param {Object} options
    * @param {float} options.valor Valor del decimal
 * @param {string} options.tipo Tipo del decimal
    */
    constructor({ valor, tipo }) {
        super();
        
        /**
         * Valor del decimal
         * @type {float}
        */
        this.valor = valor;


        /**
         * Tipo del decimal
         * @type {string}
        */
        this.tipo = tipo;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitDecimal(this);
    }
}
    
export class Booleanos extends Expresion {

    /**
    * @param {Object} options
    * @param {boolean} options.valor Valor del booleano
 * @param {string} options.tipo Tipo del booleano
    */
    constructor({ valor, tipo }) {
        super();
        
        /**
         * Valor del booleano
         * @type {boolean}
        */
        this.valor = valor;


        /**
         * Tipo del booleano
         * @type {string}
        */
        this.tipo = tipo;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitBooleanos(this);
    }
}
    
export class SecuenciaEscape extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.valor Valor de la secuencia de escape
    */
    constructor({ valor }) {
        super();
        
        /**
         * Valor de la secuencia de escape
         * @type {string}
        */
        this.valor = valor;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitSecuenciaEscape(this);
    }
}
    
export class DeclaracionVariable extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.tipoVar Tipo de la variable
 * @param {string} options.id Identificador de la variable
 * @param {Expresion} options.exp Expresion de la variable
    */
    constructor({ tipoVar, id, exp }) {
        super();
        
        /**
         * Tipo de la variable
         * @type {string}
        */
        this.tipoVar = tipoVar;


        /**
         * Identificador de la variable
         * @type {string}
        */
        this.id = id;


        /**
         * Expresion de la variable
         * @type {Expresion}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitDeclaracionVariable(this);
    }
}
    
export class ReferenciaVariable extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador de la variable
    */
    constructor({ id }) {
        super();
        
        /**
         * Identificador de la variable
         * @type {string}
        */
        this.id = id;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitReferenciaVariable(this);
    }
}
    
export class Print extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion[]} options.exps Expresion a imprimir
    */
    constructor({ exps }) {
        super();
        
        /**
         * Expresion a imprimir
         * @type {Expresion[]}
        */
        this.exps = exps;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitPrint(this);
    }
}
    
export class Embebidas extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.Nombre Expresion embebida
 * @param {string} options.Argumento Tipo de la embebida
    */
    constructor({ Nombre, Argumento }) {
        super();
        
        /**
         * Expresion embebida
         * @type {Expresion}
        */
        this.Nombre = Nombre;


        /**
         * Tipo de la embebida
         * @type {string}
        */
        this.Argumento = Argumento;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitEmbebidas(this);
    }
}
    
export class DeclaracionFuncion extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.tipo Tipo de retorno de la funcion
 * @param {string} options.id Identificador de la funcion
 * @param {string[]} options.params Parametros de la funcion
 * @param {Bloque} options.bloque Cuerpo de la funcion
    */
    constructor({ tipo, id, params, bloque }) {
        super();
        
        /**
         * Tipo de retorno de la funcion
         * @type {string}
        */
        this.tipo = tipo;


        /**
         * Identificador de la funcion
         * @type {string}
        */
        this.id = id;


        /**
         * Parametros de la funcion
         * @type {string[]}
        */
        this.params = params;


        /**
         * Cuerpo de la funcion
         * @type {Bloque}
        */
        this.bloque = bloque;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitDeclaracionFuncion(this);
    }
}
    
export class DeclaracionArreglo extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.tipo Tipo de los elementos del arreglo
 * @param {Expresion} options.id Identificador del arreglo
 * @param {Expresion} options.valores Valores del arreglo
    */
    constructor({ tipo, id, valores }) {
        super();
        
        /**
         * Tipo de los elementos del arreglo
         * @type {string}
        */
        this.tipo = tipo;


        /**
         * Identificador del arreglo
         * @type {Expresion}
        */
        this.id = id;


        /**
         * Valores del arreglo
         * @type {Expresion}
        */
        this.valores = valores;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitDeclaracionArreglo(this);
    }
}
    
export class Declaracion2Arreglo extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.tipo1 Tipo de los elementos del arreglo
 * @param {Expresion} options.id Identificador del arreglo
 * @param {string} options.tipo2 Tipo de los elementos del arreglo
 * @param {Expresion} options.numero Tamaño del arreglo
    */
    constructor({ tipo1, id, tipo2, numero }) {
        super();
        
        /**
         * Tipo de los elementos del arreglo
         * @type {string}
        */
        this.tipo1 = tipo1;


        /**
         * Identificador del arreglo
         * @type {Expresion}
        */
        this.id = id;


        /**
         * Tipo de los elementos del arreglo
         * @type {string}
        */
        this.tipo2 = tipo2;


        /**
         * Tamaño del arreglo
         * @type {Expresion}
        */
        this.numero = numero;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitDeclaracion2Arreglo(this);
    }
}
    
export class Declaracion3Arreglo extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.tipo Tipo de los elementos del arreglo
 * @param {Expresion} options.id1 Identificador del arreglo
 * @param {string} options.id2 Valor del arreglo
    */
    constructor({ tipo, id1, id2 }) {
        super();
        
        /**
         * Tipo de los elementos del arreglo
         * @type {string}
        */
        this.tipo = tipo;


        /**
         * Identificador del arreglo
         * @type {Expresion}
        */
        this.id1 = id1;


        /**
         * Valor del arreglo
         * @type {string}
        */
        this.id2 = id2;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitDeclaracion3Arreglo(this);
    }
}
    
export class IndexArreglo extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador del arreglo
 * @param {Expresion} options.index Indice a buscar
    */
    constructor({ id, index }) {
        super();
        
        /**
         * Identificador del arreglo
         * @type {string}
        */
        this.id = id;


        /**
         * Indice a buscar
         * @type {Expresion}
        */
        this.index = index;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitIndexArreglo(this);
    }
}
    
export class JoinArreglo extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Expresiones a unir
    */
    constructor({ id }) {
        super();
        
        /**
         * Expresiones a unir
         * @type {string}
        */
        this.id = id;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitJoinArreglo(this);
    }
}
    
export class LengthArreglo extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Expresiones a unir
    */
    constructor({ id }) {
        super();
        
        /**
         * Expresiones a unir
         * @type {string}
        */
        this.id = id;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitLengthArreglo(this);
    }
}
    
export class AccesoArreglo extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador del arreglo
 * @param {Expresion} options.index Indice a buscar
    */
    constructor({ id, index }) {
        super();
        
        /**
         * Identificador del arreglo
         * @type {string}
        */
        this.id = id;


        /**
         * Indice a buscar
         * @type {Expresion}
        */
        this.index = index;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitAccesoArreglo(this);
    }
}
    
export class AsignacionArreglo extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador del arreglo
 * @param {Expresion} options.index Indice a buscar
 * @param {Expresion} options.valor Valor a asignar
    */
    constructor({ id, index, valor }) {
        super();
        
        /**
         * Identificador del arreglo
         * @type {string}
        */
        this.id = id;


        /**
         * Indice a buscar
         * @type {Expresion}
        */
        this.index = index;


        /**
         * Valor a asignar
         * @type {Expresion}
        */
        this.valor = valor;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitAsignacionArreglo(this);
    }
}
    
export class Bloque extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion[]} options.instrucciones Sentencias dentro del bloque
    */
    constructor({ instrucciones }) {
        super();
        
        /**
         * Sentencias dentro del bloque
         * @type {Expresion[]}
        */
        this.instrucciones = instrucciones;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitBloque(this);
    }
}
    
export class AsignacionVariable extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador de la variable
 * @param {Expresion} options.exp Expresion a asignar
    */
    constructor({ id, exp }) {
        super();
        
        /**
         * Identificador de la variable
         * @type {string}
        */
        this.id = id;


        /**
         * Expresion a asignar
         * @type {Expresion}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitAsignacionVariable(this);
    }
}
    
export default { Expresion, OperacionAritmetica, TipoOf, OperacionUnaria, Agrupacion, Numero, Cadena, Caracter, Ternario, If, While, For, ForEach, Break, Continue, Return, Llamada, DeclaracionDimension, Declaracion2Dimension, AsignacionDimensiones, AccesoDimensiones, Switch, Decimal, Booleanos, SecuenciaEscape, DeclaracionVariable, ReferenciaVariable, Print, Embebidas, DeclaracionFuncion, DeclaracionArreglo, Declaracion2Arreglo, Declaracion3Arreglo, IndexArreglo, JoinArreglo, LengthArreglo, AccesoArreglo, AsignacionArreglo, Bloque, AsignacionVariable }

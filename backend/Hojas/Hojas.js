
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
 * @param {Expresion} options.bloques Cuerpo del while
    */
    constructor({ cond, bloques }) {
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
        this.bloques = bloques;

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
    * @param {Expresion} options.vars Inicializacion del for
 * @param {Expresion} options.cond Condicion del for
 * @param {Expresion} options.incremento Incremento del for
 * @param {Expresion} options.sentencia Cuerpo del for
    */
    constructor({ vars, cond, incremento, sentencia }) {
        super();
        
        /**
         * Inicializacion del for
         * @type {Expresion}
        */
        this.vars = vars;


        /**
         * Condicion del for
         * @type {Expresion}
        */
        this.cond = cond;


        /**
         * Incremento del for
         * @type {Expresion}
        */
        this.incremento = incremento;


        /**
         * Cuerpo del for
         * @type {Expresion}
        */
        this.sentencia = sentencia;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitFor(this);
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
    * @param {Expresion} options.exp Expresion a imprimir
    */
    constructor({ exp }) {
        super();
        
        /**
         * Expresion a imprimir
         * @type {Expresion}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitPrint(this);
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
    
export class ExpresionStmt extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion a evaluar
    */
    constructor({ exp }) {
        super();
        
        /**
         * Expresion a evaluar
         * @type {Expresion}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitExpresionStmt(this);
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
    
export default { Expresion, OperacionAritmetica, TipoOf, OperacionUnaria, Agrupacion, Numero, Cadena, Caracter, Ternario, If, While, For, Decimal, Booleanos, SecuenciaEscape, DeclaracionVariable, ReferenciaVariable, Print, Bloque, ExpresionStmt, AsignacionVariable }

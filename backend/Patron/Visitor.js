
/**

 * @typedef {import('../Hojas/Hojas.js').Expresion} Expresion


 * @typedef {import('../Hojas/Hojas.js').OperacionAritmetica} OperacionAritmetica


 * @typedef {import('../Hojas/Hojas.js').OperacionUnaria} OperacionUnaria


 * @typedef {import('../Hojas/Hojas.js').Agrupacion} Agrupacion


 * @typedef {import('../Hojas/Hojas.js').Numero} Numero


 * @typedef {import('../Hojas/Hojas.js').Cadena} Cadena


 * @typedef {import('../Hojas/Hojas.js').Caracter} Caracter


 * @typedef {import('../Hojas/Hojas.js').Decimal} Decimal


 * @typedef {import('../Hojas/Hojas.js').Booleanos} Booleanos


 * @typedef {import('../Hojas/Hojas.js').SecuenciaEscape} SecuenciaEscape


 * @typedef {import('../Hojas/Hojas.js').DeclaracionVariable} DeclaracionVariable


 * @typedef {import('../Hojas/Hojas.js').ReferenciaVariable} ReferenciaVariable


 * @typedef {import('../Hojas/Hojas.js').Print} Print


 * @typedef {import('../Hojas/Hojas.js').ExpresionStmt} ExpresionStmt


 * @typedef {import('../Hojas/Hojas.js').AsignacionVariable} AsignacionVariable

 */


/**
 * Clase base para los visitantes
 * @abstract
 */
export class BaseVisitor {

    
    /**
     * @param {Expresion} node
     * @returns {any}
     */
    visitExpresion(node) {
        throw new Error('Metodo visitExpresion no implementado');
    }
    

    /**
     * @param {OperacionAritmetica} node
     * @returns {any}
     */
    visitOperacionAritmetica(node) {
        throw new Error('Metodo visitOperacionAritmetica no implementado');
    }
    

    /**
     * @param {OperacionUnaria} node
     * @returns {any}
     */
    visitOperacionUnaria(node) {
        throw new Error('Metodo visitOperacionUnaria no implementado');
    }
    

    /**
     * @param {Agrupacion} node
     * @returns {any}
     */
    visitAgrupacion(node) {
        throw new Error('Metodo visitAgrupacion no implementado');
    }
    

    /**
     * @param {Numero} node
     * @returns {any}
     */
    visitNumero(node) {
        throw new Error('Metodo visitNumero no implementado');
    }
    

    /**
     * @param {Cadena} node
     * @returns {any}
     */
    visitCadena(node) {
        throw new Error('Metodo visitCadena no implementado');
    }
    

    /**
     * @param {Caracter} node
     * @returns {any}
     */
    visitCaracter(node) {
        throw new Error('Metodo visitCaracter no implementado');
    }
    

    /**
     * @param {Decimal} node
     * @returns {any}
     */
    visitDecimal(node) {
        throw new Error('Metodo visitDecimal no implementado');
    }
    

    /**
     * @param {Booleanos} node
     * @returns {any}
     */
    visitBooleanos(node) {
        throw new Error('Metodo visitBooleanos no implementado');
    }
    

    /**
     * @param {SecuenciaEscape} node
     * @returns {any}
     */
    visitSecuenciaEscape(node) {
        throw new Error('Metodo visitSecuenciaEscape no implementado');
    }
    

    /**
     * @param {DeclaracionVariable} node
     * @returns {any}
     */
    visitDeclaracionVariable(node) {
        throw new Error('Metodo visitDeclaracionVariable no implementado');
    }
    

    /**
     * @param {ReferenciaVariable} node
     * @returns {any}
     */
    visitReferenciaVariable(node) {
        throw new Error('Metodo visitReferenciaVariable no implementado');
    }
    

    /**
     * @param {Print} node
     * @returns {any}
     */
    visitPrint(node) {
        throw new Error('Metodo visitPrint no implementado');
    }
    

    /**
     * @param {ExpresionStmt} node
     * @returns {any}
     */
    visitExpresionStmt(node) {
        throw new Error('Metodo visitExpresionStmt no implementado');
    }
    

    /**
     * @param {AsignacionVariable} node
     * @returns {any}
     */
    visitAsignacionVariable(node) {
        throw new Error('Metodo visitAsignacionVariable no implementado');
    }
    
}

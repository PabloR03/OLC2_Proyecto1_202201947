
/**

 * @typedef {import('../Hojas/Hojas.js').Expresion} Expresion


 * @typedef {import('../Hojas/Hojas.js').OperacionBinaria} OperacionBinaria


 * @typedef {import('../Hojas/Hojas.js').OperacionUnaria} OperacionUnaria


 * @typedef {import('../Hojas/Hojas.js').Agrupacion} Agrupacion


 * @typedef {import('../Hojas/Hojas.js').Numero} Numero


 * @typedef {import('../Hojas/Hojas.js').DeclaracionVariable} DeclaracionVariable


 * @typedef {import('../Hojas/Hojas.js').ReferenciaVariable} ReferenciaVariable


 * @typedef {import('../Hojas/Hojas.js').Print} Print


 * @typedef {import('../Hojas/Hojas.js').ExpresionStmt} ExpresionStmt

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
     * @param {OperacionBinaria} node
     * @returns {any}
     */
    visitOperacionBinaria(node) {
        throw new Error('Metodo visitOperacionBinaria no implementado');
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
    
}

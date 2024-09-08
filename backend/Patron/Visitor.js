
/**

 * @typedef {import('../Hojas/Hojas.js').Expresion} Expresion


 * @typedef {import('../Hojas/Hojas.js').OperacionAritmetica} OperacionAritmetica


 * @typedef {import('../Hojas/Hojas.js').TipoOf} TipoOf


 * @typedef {import('../Hojas/Hojas.js').OperacionUnaria} OperacionUnaria


 * @typedef {import('../Hojas/Hojas.js').Agrupacion} Agrupacion


 * @typedef {import('../Hojas/Hojas.js').Numero} Numero


 * @typedef {import('../Hojas/Hojas.js').Cadena} Cadena


 * @typedef {import('../Hojas/Hojas.js').Caracter} Caracter


 * @typedef {import('../Hojas/Hojas.js').Ternario} Ternario


 * @typedef {import('../Hojas/Hojas.js').If} If


 * @typedef {import('../Hojas/Hojas.js').While} While


 * @typedef {import('../Hojas/Hojas.js').For} For


 * @typedef {import('../Hojas/Hojas.js').ForEach} ForEach


 * @typedef {import('../Hojas/Hojas.js').Break} Break


 * @typedef {import('../Hojas/Hojas.js').Continue} Continue


 * @typedef {import('../Hojas/Hojas.js').Return} Return


 * @typedef {import('../Hojas/Hojas.js').Llamada} Llamada


 * @typedef {import('../Hojas/Hojas.js').DeclaracionDimension} DeclaracionDimension


 * @typedef {import('../Hojas/Hojas.js').Declaracion2Dimension} Declaracion2Dimension


 * @typedef {import('../Hojas/Hojas.js').AsignacionDimensiones} AsignacionDimensiones


 * @typedef {import('../Hojas/Hojas.js').AccesoDimensiones} AccesoDimensiones


 * @typedef {import('../Hojas/Hojas.js').Asignacion} Asignacion


 * @typedef {import('../Hojas/Hojas.js').ExpresionStmt} ExpresionStmt


 * @typedef {import('../Hojas/Hojas.js').Struct} Struct


 * @typedef {import('../Hojas/Hojas.js').InstanciaS} InstanciaS


 * @typedef {import('../Hojas/Hojas.js').InstanciaE} InstanciaE


 * @typedef {import('../Hojas/Hojas.js').Atributo} Atributo


 * @typedef {import('../Hojas/Hojas.js').Switch} Switch


 * @typedef {import('../Hojas/Hojas.js').Decimal} Decimal


 * @typedef {import('../Hojas/Hojas.js').Booleanos} Booleanos


 * @typedef {import('../Hojas/Hojas.js').SecuenciaEscape} SecuenciaEscape


 * @typedef {import('../Hojas/Hojas.js').DeclaracionVariable} DeclaracionVariable


 * @typedef {import('../Hojas/Hojas.js').ReferenciaVariable} ReferenciaVariable


 * @typedef {import('../Hojas/Hojas.js').Print} Print


 * @typedef {import('../Hojas/Hojas.js').Embebidas} Embebidas


 * @typedef {import('../Hojas/Hojas.js').DeclaracionFuncion} DeclaracionFuncion


 * @typedef {import('../Hojas/Hojas.js').DeclaracionArreglo} DeclaracionArreglo


 * @typedef {import('../Hojas/Hojas.js').Declaracion2Arreglo} Declaracion2Arreglo


 * @typedef {import('../Hojas/Hojas.js').Declaracion3Arreglo} Declaracion3Arreglo


 * @typedef {import('../Hojas/Hojas.js').IndexArreglo} IndexArreglo


 * @typedef {import('../Hojas/Hojas.js').JoinArreglo} JoinArreglo


 * @typedef {import('../Hojas/Hojas.js').LengthArreglo} LengthArreglo


 * @typedef {import('../Hojas/Hojas.js').AccesoArreglo} AccesoArreglo


 * @typedef {import('../Hojas/Hojas.js').AsignacionArreglo} AsignacionArreglo


 * @typedef {import('../Hojas/Hojas.js').Bloque} Bloque


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
     * @param {TipoOf} node
     * @returns {any}
     */
    visitTipoOf(node) {
        throw new Error('Metodo visitTipoOf no implementado');
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
     * @param {Ternario} node
     * @returns {any}
     */
    visitTernario(node) {
        throw new Error('Metodo visitTernario no implementado');
    }
    

    /**
     * @param {If} node
     * @returns {any}
     */
    visitIf(node) {
        throw new Error('Metodo visitIf no implementado');
    }
    

    /**
     * @param {While} node
     * @returns {any}
     */
    visitWhile(node) {
        throw new Error('Metodo visitWhile no implementado');
    }
    

    /**
     * @param {For} node
     * @returns {any}
     */
    visitFor(node) {
        throw new Error('Metodo visitFor no implementado');
    }
    

    /**
     * @param {ForEach} node
     * @returns {any}
     */
    visitForEach(node) {
        throw new Error('Metodo visitForEach no implementado');
    }
    

    /**
     * @param {Break} node
     * @returns {any}
     */
    visitBreak(node) {
        throw new Error('Metodo visitBreak no implementado');
    }
    

    /**
     * @param {Continue} node
     * @returns {any}
     */
    visitContinue(node) {
        throw new Error('Metodo visitContinue no implementado');
    }
    

    /**
     * @param {Return} node
     * @returns {any}
     */
    visitReturn(node) {
        throw new Error('Metodo visitReturn no implementado');
    }
    

    /**
     * @param {Llamada} node
     * @returns {any}
     */
    visitLlamada(node) {
        throw new Error('Metodo visitLlamada no implementado');
    }
    

    /**
     * @param {DeclaracionDimension} node
     * @returns {any}
     */
    visitDeclaracionDimension(node) {
        throw new Error('Metodo visitDeclaracionDimension no implementado');
    }
    

    /**
     * @param {Declaracion2Dimension} node
     * @returns {any}
     */
    visitDeclaracion2Dimension(node) {
        throw new Error('Metodo visitDeclaracion2Dimension no implementado');
    }
    

    /**
     * @param {AsignacionDimensiones} node
     * @returns {any}
     */
    visitAsignacionDimensiones(node) {
        throw new Error('Metodo visitAsignacionDimensiones no implementado');
    }
    

    /**
     * @param {AccesoDimensiones} node
     * @returns {any}
     */
    visitAccesoDimensiones(node) {
        throw new Error('Metodo visitAccesoDimensiones no implementado');
    }
    

    /**
     * @param {Asignacion} node
     * @returns {any}
     */
    visitAsignacion(node) {
        throw new Error('Metodo visitAsignacion no implementado');
    }
    

    /**
     * @param {ExpresionStmt} node
     * @returns {any}
     */
    visitExpresionStmt(node) {
        throw new Error('Metodo visitExpresionStmt no implementado');
    }
    

    /**
     * @param {Struct} node
     * @returns {any}
     */
    visitStruct(node) {
        throw new Error('Metodo visitStruct no implementado');
    }
    

    /**
     * @param {InstanciaS} node
     * @returns {any}
     */
    visitInstanciaS(node) {
        throw new Error('Metodo visitInstanciaS no implementado');
    }
    

    /**
     * @param {InstanciaE} node
     * @returns {any}
     */
    visitInstanciaE(node) {
        throw new Error('Metodo visitInstanciaE no implementado');
    }
    

    /**
     * @param {Atributo} node
     * @returns {any}
     */
    visitAtributo(node) {
        throw new Error('Metodo visitAtributo no implementado');
    }
    

    /**
     * @param {Switch} node
     * @returns {any}
     */
    visitSwitch(node) {
        throw new Error('Metodo visitSwitch no implementado');
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
     * @param {Embebidas} node
     * @returns {any}
     */
    visitEmbebidas(node) {
        throw new Error('Metodo visitEmbebidas no implementado');
    }
    

    /**
     * @param {DeclaracionFuncion} node
     * @returns {any}
     */
    visitDeclaracionFuncion(node) {
        throw new Error('Metodo visitDeclaracionFuncion no implementado');
    }
    

    /**
     * @param {DeclaracionArreglo} node
     * @returns {any}
     */
    visitDeclaracionArreglo(node) {
        throw new Error('Metodo visitDeclaracionArreglo no implementado');
    }
    

    /**
     * @param {Declaracion2Arreglo} node
     * @returns {any}
     */
    visitDeclaracion2Arreglo(node) {
        throw new Error('Metodo visitDeclaracion2Arreglo no implementado');
    }
    

    /**
     * @param {Declaracion3Arreglo} node
     * @returns {any}
     */
    visitDeclaracion3Arreglo(node) {
        throw new Error('Metodo visitDeclaracion3Arreglo no implementado');
    }
    

    /**
     * @param {IndexArreglo} node
     * @returns {any}
     */
    visitIndexArreglo(node) {
        throw new Error('Metodo visitIndexArreglo no implementado');
    }
    

    /**
     * @param {JoinArreglo} node
     * @returns {any}
     */
    visitJoinArreglo(node) {
        throw new Error('Metodo visitJoinArreglo no implementado');
    }
    

    /**
     * @param {LengthArreglo} node
     * @returns {any}
     */
    visitLengthArreglo(node) {
        throw new Error('Metodo visitLengthArreglo no implementado');
    }
    

    /**
     * @param {AccesoArreglo} node
     * @returns {any}
     */
    visitAccesoArreglo(node) {
        throw new Error('Metodo visitAccesoArreglo no implementado');
    }
    

    /**
     * @param {AsignacionArreglo} node
     * @returns {any}
     */
    visitAsignacionArreglo(node) {
        throw new Error('Metodo visitAsignacionArreglo no implementado');
    }
    

    /**
     * @param {Bloque} node
     * @returns {any}
     */
    visitBloque(node) {
        throw new Error('Metodo visitBloque no implementado');
    }
    

    /**
     * @param {AsignacionVariable} node
     * @returns {any}
     */
    visitAsignacionVariable(node) {
        throw new Error('Metodo visitAsignacionVariable no implementado');
    }
    
}

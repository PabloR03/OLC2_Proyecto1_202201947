import { BaseVisitor } from './Patron/Visitor.js';
import { Entorno } from './oakLand/Entorno/Entorno.js';
import { operacionAritmeticaVisitor} from './oakLand/Expresiones/Aritmetica.js';
//import { DeclaracionVarVisitor } from './oakLand/Declaraciones/DeclaracionVar.js';

export class InterpreterVisitor extends BaseVisitor {

    constructor() {
        super();
        this.entornoActual = new Entorno();
        this.salida = '';
        this.operacionAritmeticaVisitor = new operacionAritmeticaVisitor(this);
        //this.DeclaracionVariable = new DeclaracionVarVisitor(this);
    }

    /**
      * @type {BaseVisitor['visitOperacionAritmetica']}
      */
    visitOperacionAritmetica(node) {
        return this.operacionAritmeticaVisitor.visitOperacionAritmetica(node);
    }

    /**
      * @type {BaseVisitor['visitOperacionUnaria']}
      */
    visitOperacionUnaria(node) {
        const exp = node.exp.accept(this);

        switch (node.op) {
            case '-':
                return -exp;
            default:
                throw new Error(`Operador no soportado: ${node.op}`);
        }
    }

    /**
      * @type {BaseVisitor['visitAgrupacion']}
      */
    visitAgrupacion(node) {
        return node.exp.accept(this);
    }

    /**
      * @type {BaseVisitor['visitNumero']}
      */
    visitNumero(node) {
        return node.valor;
    }


    /**
     * @type {BaseVisitor['visitDeclaracionVariable']}
     */
    visitDeclaracionVariable(node) {
        const tipoVariable = node.tipoVar;
        const nombreVariable = node.id;
        const valorVariable = node.exp.accept(this);
//verificar tipos con cada variable sino muere
        this.entornoActual.setVariable(tipoVariable, nombreVariable, valorVariable);
    }


    /**
      * @type {BaseVisitor['visitReferenciaVariable']}
      */
    visitReferenciaVariable(node) {
        const nombreVariable = node.id;
        return this.entornoActual.getVariable(nombreVariable);
    }


    /**
      * @type {BaseVisitor['visitPrint']}
      */
    visitPrint(node) {
        const valor = node.exp.accept(this);
        this.salida += valor + '\n';
    }


    /**
      * @type {BaseVisitor['visitExpresionStmt']}
      */
    visitExpresionStmt(node) {
        node.exp.accept(this);
    }

}

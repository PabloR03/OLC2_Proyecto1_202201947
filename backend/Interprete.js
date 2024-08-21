import { BaseVisitor } from './Patron/Visitor.js';
import { Entorno } from './oakLand/Entorno/Entorno.js';
import { operacionAritmeticaVisitor} from './oakLand/Expresiones/Aritmetica.js';

export class InterpreterVisitor extends BaseVisitor {

    constructor() {
        super();
        this.entornoActual = new Entorno();
        this.salida = '';
        this.operacionAritmeticaVisitor = new operacionAritmeticaVisitor(this);
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
      let valorVariable;
    
      // Verificar si la expresión está definida
      if (node.exp) {
        valorVariable = node.exp.accept(this);
    
        // Determinar el tipo de la variable "var" según el tipo de la expresión
        if (tipoVariable === 'var') {
          if (typeof valorVariable === 'number') {
            if (Number.isInteger(valorVariable)) {
              tipoVariable = 'int';
            } else {
              tipoVariable = 'float';
            }
          } else if (typeof valorVariable === 'string') {
            tipoVariable = 'string';
          } else if (typeof valorVariable === 'boolean') {
            tipoVariable = 'boolean';
          } else if (typeof valorVariable === 'string' && valorVariable.length === 1) {
            tipoVariable = 'char';
          } else {
            throw new Error(`No se puede determinar el tipo de la variable "${nombreVariable}".`);
          }
        }
      } else {
        // Asignar valor por defecto según el tipo de variable
        switch (tipoVariable) {
          case 'int':
            valorVariable = 0;
            break;
          case 'float':
            valorVariable = 0.0;
            break;
          case 'string':
            valorVariable = '';
            break;
          case 'boolean':
            valorVariable = false;
            break;
          case 'char':
            valorVariable = '';
            break;
          case 'var':
            valorVariable = null;
            break;
          default:
            throw new Error(`Tipo de variable "${tipoVariable}" no válido.`);
        }
      }
    
      // Verificar el tipo de la variable
      if (tipoVariable === 'int') {
        if (typeof valorVariable === 'number' && Number.isInteger(valorVariable)) {
          this.entornoActual.setVariable(tipoVariable, nombreVariable, valorVariable);
        } else {
          throw new Error(`La variable "${nombreVariable}" debe ser de tipo entero.`);
        }
      } else if (tipoVariable === 'float') {
        if (typeof valorVariable === 'number') {
          this.entornoActual.setVariable(tipoVariable, nombreVariable, valorVariable);
        } else {
          throw new Error(`La variable "${nombreVariable}" debe ser de tipo flotante.`);
        }
      } else if (tipoVariable === 'string') {
        if (typeof valorVariable === 'string') {
          this.entornoActual.setVariable(tipoVariable, nombreVariable, valorVariable);
        } else {
          throw new Error(`La variable "${nombreVariable}" debe ser de tipo cadena de texto.`);
        }
      } else if (tipoVariable === 'boolean') {
        if (typeof valorVariable === 'boolean') {
          this.entornoActual.setVariable(tipoVariable, nombreVariable, valorVariable);
        } else {
          throw new Error(`La variable "${nombreVariable}" debe ser de tipo booleano.`);
        }
      } else if (tipoVariable === 'char') {
        if (typeof valorVariable === 'string' && valorVariable.length === 1) {
          this.entornoActual.setVariable(tipoVariable, nombreVariable, valorVariable);
        } else {
          throw new Error(`La variable "${nombreVariable}" debe ser de tipo carácter.`);
        }
      } else if (tipoVariable === 'var') {
        this.entornoActual.setVariable(tipoVariable, nombreVariable, valorVariable);
      } else {
        throw new Error(`Tipo de variable "${tipoVariable}" no válido.`);
      }
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

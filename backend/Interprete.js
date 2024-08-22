import { BaseVisitor } from './Patron/Visitor.js';
import { Entorno } from './oakLand/Entorno/Entorno.js';

export class InterpreterVisitor extends BaseVisitor {

    constructor() {
        super();
        this.entornoActual = new Entorno();
        this.salida = '';
    }

    interpretar(nodo) {
      return nodo.accept(this);
  }

    /**
      * @type {BaseVisitor['visitOperacionAritmetica']}
      */
    visitOperacionAritmetica(node) {
      const izq = node.izq.accept(this);
      const der = node.der.accept(this);
      
      // Función auxiliar para determinar si un número es entero
      const esEntero = (num) => Number.isInteger(num);
    
      switch (node.op) {
        case '+':
          if (typeof izq === 'number' && typeof der === 'number') {
            // Suma de números
            const resultado = izq + der;
            return esEntero(izq) && esEntero(der) ? Math.floor(resultado) : resultado;
          } else if (typeof izq === 'string' && typeof der === 'string') {
            // Concatenación de strings
            return izq + der;
          } else {
            throw new Error(`Operación no válida: ${typeof izq} + ${typeof der}`);
          }
        case '-':
          if (typeof izq === 'number' && typeof der === 'number') {
            const resultado = izq - der;
            return esEntero(izq) && esEntero(der) ? Math.floor(resultado) : resultado;
          } else {
            throw new Error(`Operación no válida: ${typeof izq} - ${typeof der}`);
          }
        case '*':
          if (typeof izq === 'number' && typeof der === 'number') {
            const resultado = izq * der;
            return esEntero(izq) && esEntero(der) ? Math.floor(resultado) : resultado;
          } else {
            throw new Error(`Operación no válida: ${typeof izq} * ${typeof der}`);
          }
        case '/':
          if (typeof izq === 'number' && typeof der === 'number') {
            if (der === 0) {
              throw new Error('División por cero');
            }
            return izq / der; // Siempre devuelve un float
          } else {
            throw new Error(`Operación no válida: ${typeof izq} / ${typeof der}`);
          }
        case '%':
          if (esEntero(izq) && esEntero(der)) {
            if (der === 0) {
              throw new Error('Módulo por cero');
            }
            return izq % der;
          } else {
            throw new Error(`Operación de módulo solo válida para enteros: ${typeof izq} % ${typeof der}`);
          }
        default:
          throw new Error(`Operador no soportado: ${node.op}`);
      }
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

    visitSecuenciaEscape(node) {
      return node.valor;
    }

    /**
     * @type {BaseVisitor['visitDeclaracionVariable']}
     */
    //visitDeclaracionVariable(node) {
      visitDeclaracionVariable(node) {
        const tipoDeclarado = node.tipoVar;
        const nombreVariable = node.id;
        let valorVariable;
        let tipoInferido = tipoDeclarado;
      // int a = 5;
        // Verificar si la expresión está definida
        if (node.exp) {
          valorVariable = node.exp.accept(this);
      
          // Determinar el tipo de la variable "var" según el tipo de la expresión
          if (tipoDeclarado === 'var') {
            if (typeof valorVariable === 'number') {
              if (Number.isInteger(valorVariable)) {
                tipoInferido = 'int';
              } else {
                tipoInferido = 'float';
              }
            } else if (typeof valorVariable === 'string') {
              if (valorVariable.length === 1) {
                tipoInferido = 'char';
              } else {
                tipoInferido = 'string';
              }
            } else if (typeof valorVariable === 'bool') {
              tipoInferido = 'boolean';
            } else {
              throw new Error(`No se puede determinar el tipo de la variable "${nombreVariable}".`);
            }
          }
        } else {
          // int a;
          // Asignar valor por defecto según el tipo de variable
          switch (tipoDeclarado) {
            case 'int':
              valorVariable = 0;
              break;
            case 'float':
              valorVariable = 0.0;
              break;
            case 'string':
              valorVariable = '';
              break;
            case 'bool':
              valorVariable = true;
              break;
            case 'char':
              valorVariable = '';
              break;
            case 'var':
              valorVariable = null;
              tipoInferido = 'var';  // Mantenemos 'var' si no hay expresión
              break;
            default:
              throw new Error(`Tipo de variable "${tipoDeclarado}" no válido.`);
          }
        }
      
        // Verificar el tipo de la variable
        if (tipoInferido === 'int') {
          if (typeof valorVariable === 'number' && Number.isInteger(valorVariable)) {
            this.entornoActual.setVariable(tipoInferido, nombreVariable, valorVariable);
          } else {
            throw new Error(`La variable "${nombreVariable}" debe ser de tipo entero.`);
          }
        } else if (tipoInferido === 'float') {
          if (typeof valorVariable === 'number') {
            this.entornoActual.setVariable(tipoInferido, nombreVariable, valorVariable);
          } else {
            throw new Error(`La variable "${nombreVariable}" debe ser de tipo flotante.`);
          }
        } else if (tipoInferido === 'string') {
          if (typeof valorVariable === 'string') {
            this.entornoActual.setVariable(tipoInferido, nombreVariable, valorVariable);
          } else {
            throw new Error(`La variable "${nombreVariable}" debe ser de tipo cadena de texto.`);
          }
        } else if (tipoInferido === 'bool') {
          if (typeof valorVariable === 'boolean') {
            this.entornoActual.setVariable(tipoInferido, nombreVariable, valorVariable);
          } else {
            throw new Error(`La variable "${nombreVariable}" debe ser de tipo booleano.`);
          }
        } else if (tipoInferido === 'char') {
          if (typeof valorVariable === 'string' && valorVariable.length <= 1) {
            this.entornoActual.setVariable(tipoInferido, nombreVariable, valorVariable);
          } else {
            throw new Error(`La variable "${nombreVariable}" debe ser de tipo carácter.`);
          }
        } else if (tipoInferido === 'var') {
          this.entornoActual.setVariable(tipoInferido, nombreVariable, valorVariable);
        } else {
          throw new Error(`Tipo de variable "${tipoInferido}" no válido.`);
        }
      }
  

    /**
     * @type {BaseVisitor['visitCadena']}
     */
    visitCadena(node) {
      // Quitar comillas dobles de la cadena que traen las hojas
      return node.valor.slice(1, -1);
    }

    /**
     * @type {BaseVisitor['visitCaracter']}
     */
    visitCaracter(node) {
      // Quitar las comillas simples del caracter que traen las hojas
        return node.valor.slice(1, -1);
    }

    /**
      * @type {BaseVisitor['visitReferenciaVariable']}
      */
    visitReferenciaVariable(node) {
        const nombreVariable = node.id;
        return this.entornoActual.getVariable(nombreVariable);
    }

    /**
     * @type {BaseVisitor['visitDecimal']}
     */
    visitDecimal(node) {
        return node.valor;
    }

    /**
     * @type {BaseVisitor['visitBooleanos']}
     */
    visitBooleanos(node) {
        return node.valor;
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

    /**
      * @type {BaseVisitor['visitAsignacionVariable']}
      */  
    visitAsignacionVariable(node) {
      const valor = node.exp.accept(this);  // Evalúa la expresión
      this.entornoActual.assignVariable(node.id, valor);
      return valor;
    }

}

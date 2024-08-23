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
      const tiposValidos = ['number', 'string'];
      
      // Función auxiliar para determinar si un número es entero
      const esEntero = (num) => Number.isInteger(num);
    
      switch (node.op) {
        case '+=': 
        if (typeof izq === 'number' && typeof der === 'number') {
          if (Number.isInteger(izq) && Number.isInteger(der)) {
              return parseInt(izq + der);
          } else if (!Number.isInteger(izq)) {
              return parseFloat(izq + der);
          } else if (Number.isInteger(izq) && !Number.isInteger(der)) {
              throw new Error(`Error: No se puede realizar la operación 'int += float'.`);
          }
        } else if (typeof izq === 'string' && typeof der === 'string') {
            return izq + der;
        } else {
            throw new Error(`Error: Operación no permitida entre tipos ${typeof izq} y ${typeof der}`);
        }
        case '-=': 
        if (typeof izq === 'number' && typeof der === 'number') {
          if (Number.isInteger(izq) && Number.isInteger(der)) {
              return parseInt(izq - der);
          } else if (!Number.isInteger(izq)) {
              return parseFloat(izq - der);
          } else if (Number.isInteger(izq) && !Number.isInteger(der)) {
              throw new Error(`Error: No se puede realizar la operación 'int -= float'. La variable 'var1' es de tipo int.`);
          }
          } else {
          throw new Error(`Error: Operación no permitida entre tipos ${typeof izq} y ${typeof der}`);
          }

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
            console.log(typeof resultado);
            return esEntero(izq) && esEntero(der) ? Math.floor(resultado) : resultado;
          } else {
            throw new Error(`Operación no válida: ${typeof izq} * ${typeof der}`);
          }
        case '/':
          if (typeof izq === 'number' && typeof der === 'number') {
            if (der === 0) {
              throw new Error('División por cero');
            }
            const resultado = izq / der;
            console.log(typeof resultado);
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
        case '==':
          if (typeof izq !== typeof der) {
              throw new Error(`Error: No se puede comparar tipos diferentes ${typeof izq} y ${typeof der}`);
          }
          if (typeof izq === 'number' && typeof der === 'number') {
              return izq === der;
          } else if (typeof izq === 'string' && typeof der === 'string') {
              return izq.localeCompare(der) === 0;
          } else {
              return izq === der;
          }
          case '!=':  
            if (typeof izq !== typeof der) {
              throw new Error(`Error: No se puede comparar tipos diferentes ${typeof izq} y ${typeof der}`);
            }
            if (typeof izq === 'number' && typeof der === 'number') {
                return izq !== der;
            } else if (typeof izq === 'string' && typeof der === 'string') {
                return izq.localeCompare(der) !== 0;
            } else {
                return izq !== der;
          }
          case '>':
            if (!tiposValidos.includes(typeof izq) || !tiposValidos.includes(typeof der)) {
                throw new Error(`Error: Operación no permitida entre tipos ${typeof izq} y ${typeof der}`);
            }
            if (typeof izq !== typeof der) {
                throw new Error(`Error: No se puede comparar tipos diferentes ${typeof izq} y ${typeof der}`);
            }
            if (typeof izq === 'string' && izq.length !== 1 && der.length !== 1) {
                throw new Error(`Error: Comparación de caracteres solo permitida entre literales de un solo carácter.`);
            }
            return izq > der;
          case '>=':
            if (!tiposValidos.includes(typeof izq) || !tiposValidos.includes(typeof der)) {
                throw new Error(`Error: Operación no permitida entre tipos ${typeof izq} y ${typeof der}`);
            }
            if (typeof izq !== typeof der) {
                throw new Error(`Error: No se puede comparar tipos diferentes ${typeof izq} y ${typeof der}`);
            }
            if (typeof izq === 'string' && izq.length !== 1 && der.length !== 1) {
                throw new Error(`Error: Comparación de caracteres solo permitida entre literales de un solo carácter.`);
            }
            return izq >= der;
          case '<':
            if (!tiposValidos.includes(typeof izq) || !tiposValidos.includes(typeof der)) {
              throw new Error(`Error: Operación no permitida entre tipos ${typeof izq} y ${typeof der}`);
            }
            if (typeof izq !== typeof der) {
                throw new Error(`Error: No se puede comparar tipos diferentes ${typeof izq} y ${typeof der}`);
            }
            if (typeof izq === 'string' && izq.length !== 1 && der.length !== 1) {
                throw new Error(`Error: Comparación de caracteres solo permitida entre literales de un solo carácter.`);
            }
            return izq < der;
          case '<=':
            if (!tiposValidos.includes(typeof izq) || !tiposValidos.includes(typeof der)) {
              throw new Error(`Error: Operación no permitida entre tipos ${typeof izq} y ${typeof der}`);
            }
            if (typeof izq !== typeof der) {
                throw new Error(`Error: No se puede comparar tipos diferentes ${typeof izq} y ${typeof der}`);
            }
            if (typeof izq === 'string' && izq.length !== 1 && der.length !== 1) {
                throw new Error(`Error: Comparación de caracteres solo permitida entre literales de un solo carácter.`);
            }
            return izq <= der;
          case '&&':
            if (typeof izq === 'boolean' && typeof der === 'boolean') {
              return izq && der;
            } else {
                throw new Error(`Error: Operación AND solo se permite entre valores booleanos.`);
            }
          case '||':
            if (typeof izq === 'boolean' && typeof der === 'boolean') {
              return izq || der;
            } else {
                throw new Error(`Error: Operación OR solo se permite entre valores booleanos.`);
            }
          case '!':
            if (typeof izq === 'boolean') {
              return !izq;
            } else {
                throw new Error(`Error: Operación NOT solo se permite sobre un valor booleano.`);
            }
        default:
          throw new Error(`Operador no soportado: ${node.op}`);
      }
    }

    /**
      * @type {BaseVisitor['visitIf']}
      */


    visitIf(node) {
      const condicion = node.cond.accept(this);
      if (condicion) {
          node.verdad.accept(this);
          return;
      }
      if (node.falso) {
          node.falso.accept(this);
        }
    }

/**
      * @type {BaseVisitor['visitWhile']}
      */
    visitWhile(node) {
      while (node.cond.accept(this)) {
          node.bloques.accept(this);
      }
    }

    /**
     * @type {BaseVisitor['visitFor']}
     */
    visitFor(node) {
      const entornoAnterior = this.entornoActual
      this.entornoActual = new Entorno(entornoAnterior)
      // Visitar la inicialización
      node.init.accept(this);

      while(node.cond.accept(this)){
          // Visitar el cuerpo
          node.sentencia.accept(this);
          // Visitar la actualización
          node.incremento.accept(this);
      }    
      this.entornoActual = entornoAnterior
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
      * @type {BaseVisitor['visitTipoOf']}
      */
        visitTipoOf(node) {
          const valor = node.exp.accept(this);
    
          if (typeof valor === 'number') {
              if (Number.isInteger(valor)) {
                  return 'int';
              } else {
                  return 'float';
              }
          } else if (typeof valor === 'boolean') {
              return 'bolean';
          } else if (typeof valor === 'string') {
              if (valor.length === 1) {
                  return 'char';
              } else {
                  return 'string';
              }
          } else {
              // En caso de que el valor no coincida con ninguno de los tipos esperados
              return 'undefined';
          }
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
            } else if (typeof valorVariable === 'bolean') {
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
            case 'bolean':
              valorVariable = true;
              break;
            case 'char':
              valorVariable = '\0';
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
        } else if (tipoInferido === 'bolean') {
          if (typeof valorVariable === 'boolean') {
            this.entornoActual.setVariable(tipoInferido, nombreVariable, valorVariable);
          } else {
            throw new Error(`La variable "${nombreVariable}" debe ser de tipo booleano.`);
          }
        }else if (tipoInferido === 'char') {
          if (typeof valorVariable === 'string' && valorVariable.length === 1) {
            this.entornoActual.setVariable(tipoInferido, nombreVariable, valorVariable);
          } else {
            throw new Error(`El valor de la variable "${nombreVar}" debe ser de tipo carácter.`);
          }
        } else if (tipoInferido === 'string' && typeof valor === 'string') {
          entorno.setVariable(tipoInferido, this.nombre, valor);
        } else if (tipoInferido === 'var') {
          this.entornoActual.setVariable(tipoInferido, nombreVariable, valorVariable);
        } else {
          throw new Error(`Tipo de variable "${tipoInferido}" no válido.`);
        }
        console.log(this.entornoActual);
      }
  

    /**
     * @type {BaseVisitor['visitCadena']}
     */
    visitCadena(node) {
      // Quitar comillas dobles de la cadena que traen las hojas
      return node.valor;
    }

    /**
     * @type {BaseVisitor['visitCaracter']}
     */
    visitCaracter(node) {
      // Quitar las comillas simples del caracter que traen las hojas
        return node.valor;
    }

        /**
     * @type {BaseVisitor['visitTernario']}
     */
      visitTernario(node) {
          const condic = node.condicion.accept(this);
    
          if (condic) {
              
              return node.verdadero.accept(this);
          }
          return node.falso.accept(this);
      
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
     * @type {BaseVisitor['visitBloque']}
     */
      visitBloque(node) {
          const entornoAnterior = this.entornoActual;
          this.entornoActual = new Entorno(entornoAnterior);
  
          node.instrucciones.forEach(instruccion => instruccion.accept(this));
          
          this.entornoActual = entornoAnterior;
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

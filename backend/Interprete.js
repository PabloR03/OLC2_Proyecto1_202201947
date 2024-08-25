import { BaseVisitor } from './Patron/Visitor.js';
import { Entorno } from './oakLand/Entorno/Entorno.js';
import { BreakException, ContinueException } from './oakLand/Instrucciones/Transferencia.js';

export class InterpreterVisitor extends BaseVisitor {

    constructor() {
        super();
        this.entornoActual = new Entorno();
        this.salida = '';
    }

    interpretar(nodo) {
      return nodo.accept(this);
  }
//////////////////////////////////////////// TIPOS DE DATOS ////////////////////////////////////////////
/**
 * @type {BaseVisitor['visitCadena']}
 */
visitCadena(node) {
  return {valor: node.valor, tipo: node.tipo};
}

/**
 * @type {BaseVisitor['visitCaracter']}
 */
visitCaracter(node) {
  // Quitar las comillas simples del caracter que traen las hojas
    return {valor: node.valor, tipo: node.tipo};
}

/**
 * @type {BaseVisitor['visitBooleanos']}
 */
visitBooleanos(node) {
  console.log(node.valor);
  return {valor: node.valor, tipo: node.tipo};
}

/**
  * @type {BaseVisitor['visitNumero']}
  */
visitNumero(node) {

  return {valor: node.valor, tipo: node.tipo};
}

//////////////////////////////////////////// OPERACIONES ARITMETICAS y UNARIAS ////////////////////////////////////////////
/**
  * @type {BaseVisitor['visitOperacionAritmetica']}
  */
visitOperacionAritmetica(node) {
  const izq = node.izq.accept(this);
  const der = node.der.accept(this);

  // Verifica que los operandos tengan tipos válidos
  const tiposValidos = ['int', 'float', 'string'];

  const esEntero = (valor) => valor.tipo === 'int';
  const esFlotante = (valor) => valor.tipo === 'float';
  const esNumero = (valor) => esEntero(valor) || esFlotante(valor);
  const esCadena = (valor) => valor.tipo === 'string';

  switch (node.op) {
    case '+=':
    case '+':
      if (esNumero(izq) && esNumero(der)) {
        return { valor: izq.valor + der.valor, tipo: esEntero(izq) && esEntero(der) ? 'int' : 'float' };
      } else if (esCadena(izq) && esCadena(der)) {
        return { valor: izq.valor + der.valor, tipo: 'string' };
      } else {
        throw new Error(`Error: Operación '+' no permitida entre tipos ${izq.tipo} y ${der.tipo}`);
      }

    case '-=':
    case '-':
      if (esNumero(izq) && esNumero(der)) {
        return { valor: izq.valor - der.valor, tipo: esEntero(izq) && esEntero(der) ? 'int' : 'float' };
      } else {
        throw new Error(`Error: Operación '-' no permitida entre tipos ${izq.tipo} y ${der.tipo}`);
      }

    case '*':
      if (esNumero(izq) && esNumero(der)) {
        return { valor: izq.valor * der.valor, tipo: esEntero(izq) && esEntero(der) ? 'int' : 'float' };
      } else {
        throw new Error(`Error: Operación '*' no permitida entre tipos ${izq.tipo} y ${der.tipo}`);
      }

    case '/':
      if (esNumero(izq) && esNumero(der)) {
        if (der.valor === 0) {
          throw new Error('Error: División por cero.');
        }
        return { valor: izq.valor / der.valor, tipo: esEntero(izq) && esEntero(der) ? 'int' : 'float' };
      } else {
        throw new Error(`Error: Operación '/' no permitida entre tipos ${izq.tipo} y ${der.tipo}`);
      }

    case '%':
      if (esEntero(izq) && esEntero(der)) {
        if (der.valor === 0) {
          throw new Error('Error: Módulo por cero.');
        }
        return { valor: izq.valor % der.valor, tipo: 'int' };
      } else {
        throw new Error(`Error: Operación '%' solo permitida entre valores enteros.`);
      }

    case '==':
      return { valor: izq.valor === der.valor, tipo: 'boolean' };

    case '!=':
      return { valor: izq.valor !== der.valor, tipo: 'boolean' };

    case '>':
    case '>=':
    case '<':
    case '<=':
      if (!esNumero(izq) || !esNumero(der)) {
        throw new Error(`Error: Operación '${node.op}' no permitida entre tipos ${izq.tipo} y ${der.tipo}`);
      }
      return { valor: eval(`izq.valor ${node.op} der.valor`), tipo: 'boolean' };

    case '&&':
    case '||':
      if (izq.tipo !== 'boolean' || der.tipo !== 'boolean') {
        throw new Error(`Error: Operación lógica '${node.op}' solo permitida entre valores booleanos.`);
      }
      return { valor: eval(`izq.valor ${node.op} der.valor`), tipo: 'boolean' };

    case '!':
      if (izq.tipo !== 'boolean') {
        throw new Error('Error: Operación NOT solo permitida sobre un valor booleano.');
      }
      return { valor: !izq.valor, tipo: 'boolean' };

    default:
      throw new Error(`Error: Operador no soportado: ${node.op}`);
  }
}


/**
 * @type {BaseVisitor['visitOperacionUnaria']}
 */
visitOperacionUnaria(node) {
  const exp = node.datos.accept(this);

  switch (node.op) {
    case '-':
      if (exp.tipo === 'int' || exp.tipo === 'float') {
        return { valor: -exp.valor, tipo: exp.tipo };  // Negación para números
      } else {
        throw new Error(`Error: El operador '-' solo se permite con valores numéricos, pero recibió un valor de tipo ${exp.tipo}.`);
      }

    case '++':
      if (exp.tipo === 'int') {
        return { valor: exp.valor + 1, tipo: 'int' };  // Incremento para enteros
      } else if (exp.tipo === 'float') {
        return { valor: exp.valor + 1, tipo: 'float' };  // Incremento para flotantes
      } else {
        throw new Error(`Error: El operador '++' solo se permite con valores numéricos, pero recibió un valor de tipo ${exp.tipo}.`);
      }

    case '--':
      if (exp.tipo === 'int') {
        return { valor: exp.valor - 1, tipo: 'int' };  // Decremento para enteros
      } else if (exp.tipo === 'float') {
        return { valor: exp.valor - 1, tipo: 'float' };  // Decremento para flotantes
      } else {
        throw new Error(`Error: El operador '--' solo se permite con valores numéricos, pero recibió un valor de tipo ${exp.tipo}.`);
      }

    case '!':
      if (exp.tipo === 'boolean') {
        return { valor: !exp.valor, tipo: 'boolean' };  // Negación lógica para booleanos
      } else {
        throw new Error(`Error: El operador '!' solo se permite con valores booleanos, pero recibió un valor de tipo ${exp.tipo}.`);
      }

    default:
      throw new Error(`Operador no soportado: ${node.op}`);
  }
}

//////////////////////////////////////////// SENTENCIAS ////////////////////////////////////////////

/**
 * @type {BaseVisitor['visitDeclaracionVariable']}
 */
visitDeclaracionVariable(node) {
  const tipoDeclarado = node.tipoVar;  // Tipo declarado en la declaración
  const nombreVariable = node.id;      // Nombre de la variable
  let valorVariable;
  let tipoFinal = tipoDeclarado;       // Tipo final que se asignará

  // Si hay una expresión asociada a la variable
  if (node.exp) {
      valorVariable = node.exp.accept(this);  // Obtener valor y tipo desde la expresión
      tipoFinal = tipoDeclarado === 'var' ? valorVariable.tipo : tipoDeclarado;  // Inferir tipo si es 'var'
  } else {
      // Asignar valor por defecto según el tipo declarado
      switch (tipoDeclarado) {
          case 'int':
              valorVariable = { valor: 0, tipo: 'int' };
              break;
          case 'float':
              valorVariable = { valor: 0.0, tipo: 'float' };
              break;
          case 'string':
              valorVariable = { valor: '', tipo: 'string' };
              break;
          case 'boolean':
              valorVariable = { valor: true, tipo: 'boolean' };
              break;
          case 'char':
              valorVariable = { valor: '\0', tipo: 'char' };
              break;
          case 'var':
              valorVariable = { valor: null, tipo: 'var' };  // Valor y tipo indefinidos
              break;
          default:
              throw new Error(`Tipo de variable "${tipoDeclarado}" no válido.`);
      }
  }
  // Verificación de tipo
  if (tipoFinal !== valorVariable.tipo) {
      throw new Error(`Tipo de la variable "${nombreVariable}" no coincide con el tipo de la expresión.`);
  }
  // Definir la variable en el entorno actual
  this.entornoActual.setVariable(tipoFinal, nombreVariable, valorVariable);
}

/**
 * @type {BaseVisitor['visitReferenciaVariable']}
 */
visitReferenciaVariable(node) {
    const variable = this.entornoActual.getVariable(node.id);
    return variable.valor;
}

/**
 * @type {BaseVisitor['visitPrint']}
 */
visitPrint(node) {
  const valores = node.exps.map(exp => {
    const resultado = exp.accept(this);
    return resultado.valor !== undefined ? resultado.valor : resultado;
  });
  
  const salidaFormateada = valores.join(' ');
  this.salida += salidaFormateada + '\n';
}

/**
  * @type {BaseVisitor['visitAsignacionVariable']}
  */  
visitAsignacionVariable(node) {
  const valor = node.exp.accept(this);
  this.entornoActual.assignVariable(node.id, valor);
  return valor;
}

/**
* @type {BaseVisitor['visitPrint']}
*/
visitPrint(node) {
  const valor = node.exp.accept(this).valor;
  this.salida += valor + '\n';
}
//////////////////////////////////////////// MENORES AUXILIARES ////////////////////////////////////////////

/**
  * @type {BaseVisitor['visitAgrupacion']}
  */
visitAgrupacion(node) {
  return node.exp.accept(this);
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
* @type {BaseVisitor['visitExpresionStmt']}
*/
visitExpresionStmt(node) {
  node.exp.accept(this).valor;
}

//////////////////////////////////////////// INSTRUCCIONES ////////////////////////////////////////////
/**
 * @type {BaseVisitor['visitIf']}
 */
visitIf(node) {
  // Evaluar la condición del 'if'
  const condicion = node.cond.accept(this);
  // Depurar el valor devuelto por la condición
  console.log("Valor de la condición:", condicion);
  // Verificar que la condición es de tipo booleano
  if (condicion.tipo !== 'boolean') {
    throw new Error(`Error: La condición de la sentencia 'if' debe ser un valor booleano, pero se obtuvo un valor de tipo ${condicion.tipo}.`);
  }
  // Ejecutar el bloque "verdad" si la condición es verdadera
  if (condicion.valor) {
    const resultadoVerdad = node.verdad.accept(this);
    return resultadoVerdad ? { valor: resultadoVerdad.valor } : { valor: null };
  }
  // Ejecutar el bloque "falso" si la condición es falsa y existe un bloque "falso"
  if (node.falso) {
    const resultadoFalso = node.falso.accept(this);
    return resultadoFalso ? { valor: resultadoFalso.valor } : { valor: null };
  }
  // Retornar null si no hay bloque "falso" y la condición es falsa
  return { valor: null };
}

/**
 * @type {BaseVisitor['visitWhile']}
 */
visitWhile(node) {
  const initEntorno = this.entornoActual;

  while (true) {
    try {
      if (!node.cond.accept(this).valor) {
        break;
      }
      node.sentencias.accept(this);
    } catch (error) {
      if (error instanceof BreakException) {
        break;
      } else if (error instanceof ContinueException) {
        continue;
      } else {
        throw error;
      }
    }
  }

  this.entornoActual = initEntorno;
}

/**
 * @type {BaseVisitor['visitFor']}
 */
visitFor(node) {
  const initEntorno = this.entornoActual;

  for (node.init.accept(this); node.cond.accept(this).valor; node.inc.accept(this)) {
    try {
      node.sentencias.accept(this);
    } catch (error) {
      if (error instanceof BreakException) {
        break;
      } else if (error instanceof ContinueException) {
        continue;
      } else {
        throw error;
      }
    }
  }

  this.entornoActual = initEntorno;
}

/**
 * @type {BaseVisitor['visitSwitch']}
 */
visitSwitch(node) {
  const initEntorno = this.entornoActual;
  let casoEncontrado = false;

  try {
    for (const caso of node.cases) {
      if (!casoEncontrado && caso.valor.accept(this).valor === node.expre.accept(this).valor) {
        casoEncontrado = true;
      }

      if (casoEncontrado) {
        this.entornoActual = new Entorno(initEntorno);
        
        for (const sentencia of caso.sentenciasBloque) {
          try {
            sentencia.accept(this);
          } catch (error) {
            if (error instanceof BreakException) {
              // Salir del switch completamente
              return;
            } else if (error instanceof ContinueException) {
              // Continuar con el siguiente caso
              break;
            } else {
              throw error;
            }
          }
        }
      }
    }
    // Manejo del caso default
    if (!casoEncontrado && node.def) {
      this.entornoActual = new Entorno(initEntorno);
      for (const sentencia of node.def.sentencias) {
        try {
          sentencia.accept(this);
        } catch (error) {
          if (error instanceof BreakException) {
            // Salir del switch
            return;
          } else if (error instanceof ContinueException) {
            // Ignorar continue en el caso default
            break;
          } else {
            throw error;
          }
        }
      }
    }
  } finally {
    // Asegurarse de restaurar el entorno original
    this.entornoActual = initEntorno;
  }
}
/**
 * @type {BaseVisitor['visitTipoOf']}
 */
visitTipoOf(node) {
  const valor = node.exp.accept(this);

  switch (valor.tipo) {
    case 'int':
      return 'int';
    case 'float':
      return 'float';
    case 'boolean':
      return 'boolean';
    case 'char':
      return 'char';
    case 'string':
      return 'string';
    default:
      // En caso de que el valor no coincida con ninguno de los tipos esperados
      return 'undefined';
  }
}


/**
 * @type {BaseVisitor['visitTernario']}
 */
visitTernario(node) {
  const condic = node.condicion.accept(this);

  // Validación del tipo de la condición
  if (condic.tipo !== 'boolean') {
    throw new Error(`Error: La condición del operador ternario debe ser un valor booleano, pero se obtuvo ${condic.tipo}.`);
  }

  // Evaluar la rama verdadera o falsa dependiendo del valor de la condición
  if (condic.valor) {
    return node.verdadero.accept(this);  // Retorna el resultado del bloque verdadero
  }
  
  return node.falso.accept(this);  // Retorna el resultado del bloque falso
}

//////////////////////////////////////////// TRANSFERENCIAS ////////////////////////////////////////////

/**
 * @type {BaseVisitor['visitBreak']}
 */
visitBreak(node) {
  throw new BreakException();
}

/**
 * @type {BaseVisitor['visitContinue']}
 */
visitContinue(node) {
  throw new ContinueException();
}

/**
 * @type {BaseVisitor['visitReturn']}
 */
visitReturn(node) {
  const valor = node.expresion ? node.expresion.accept(this) : null;
  throw new ReturnException(valor);
}


}

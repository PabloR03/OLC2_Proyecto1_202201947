import { BaseVisitor } from './Patron/Visitor.js';
import { Entorno } from './oakLand/Entorno/Entorno.js';
import { BreakException, ContinueException } from './oakLand/Instrucciones/Transferencia.js';
import { Invocable } from './oakLand/Instrucciones/Invocaciones.js';
import { Embebidas } from './oakLand/Instrucciones/funEmbebidas.js';

export class InterpreterVisitor extends BaseVisitor {
    constructor() {
        super();
        this.entornoActual = new Entorno();
        Object.entries(Embebidas).forEach(([nombre, funcion]) => {
          this.entornoActual.setVariable('funcion', nombre, funcion);
        });
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

/**
     * @type {BaseVisitor['visitEmbebidas']}
     */ 
visitEmbebidas(node) {
  const expresion = node.Argumento.accept(this);
  const NombreFuncion = node.Nombre;
  switch (NombreFuncion) {
      case 'typeof':
          switch (expresion.tipo) {
              case "int":
                  return {valor: expresion.tipo, tipo: "string" };
              case "float":
                  return {valor: expresion.tipo, tipo: "string" };
              case "string": 
                  return {valor: expresion.tipo, tipo: "string" };
              case "char":
                  return {valor: expresion.tipo, tipo: "string" };
              case "boolean": 
                  return {valor: expresion.tipo, tipo: "string" };    
              default:
                  throw new Error(`El Argumento De typeof Es Tipo Desconocido: "${arg.tipo}".`);
              }
      case 'toString':
          return {valor: expresion.valor.toString(), tipo: "string"};
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
const valores = node.exps.map(exps => {
  const resultado = exps.accept(this);
  if (Array.isArray(resultado)) {
      return resultado;
  } else {
      return resultado.valor;
  }
});
this.salida += valores.join(' ') + '\n';
}

/**
  * @type {BaseVisitor['visitAsignacionVariable']}
  */  
visitAsignacionVariable(node) {
  const valor = node.exp.accept(this);
  this.entornoActual.assignVariable(node.id, valor);
  return valor;
}

//////////////////////////////////////////// Arreglos ////////////////////////////////////////////

/**
     * @type {BaseVisitor['visitDeclaracionArreglo']}
     */ 
visitDeclaracionArreglo(node) {
  let arreglo = [];
  const valoresEvaluados = node.valores.map(valor => valor.accept(this));
  for (let valor of valoresEvaluados) {
      if (valor.tipo !== node.tipo) {
          throw new Error(`El Tipo Del Valor "${valor.valor}" No Coincide Con El Tipo Del Arreglo "${node.tipo}".`);
      }
      arreglo.push(valor.valor);
  }
  this.entornoActual.setVariable(node.tipo, node.id, arreglo);
}

/**
* @type {BaseVisitor['visitDeclaracionArreglo2']}
*/ 
visitDeclaracion2Arreglo(node) {
  const numero = node.numero.accept(this);
  let arreglo = [];
  if (node.tipo1 !== node.tipo2) {
      throw new Error(`El Tipo Del Arreglo "${node.tipo1}" No Coincide Con El Tipo Del Arreglo "${node.tipo2}".`);
  }
  
  if (numero.tipo !== 'int') {
      throw new Error(`El Tamaño Del Arreglo Debe Ser De Tipo Int: "${numero.tipo}".`);
  }
  if (numero.valor < 0) {
      throw new Error(`El Tamaño Del Arreglo No Puede Ser Negativo: "${numero.valor}".`);
  }
  switch (node.tipo1) {
      case 'int':
          arreglo = Array(numero.valor).fill(0);
          break;
      case 'float':
          arreglo = Array(numero.valor).fill(0.0);
          break;
      case 'string':
          arreglo = Array(numero.valor).fill('');
          break;
      case 'char':
          arreglo = Array(numero.valor).fill('\0');
          break;
      case 'boolean':
          arreglo = Array(numero.valor).fill(false);
          break;
      default:
          throw new Error(`Tipo De Arreglo No Válido: "${node.tipo1}".`);
  }
  this.entornoActual.setVariable(node.tipo1, node.id, arreglo);
}

/**
* @type {BaseVisitor['visitDeclaracion3Arreglo']}
*/ 
visitDeclaracion3Arreglo(node) {
  const valores = this.entornoActual.getVariable(node.id2);
  if (!Array.isArray(valores.valor)) {
      throw new Error(`La Variable "${node.id2}" No Es Un Arreglo.`);
  }
  if (valores.tipo !== node.tipo) {
      throw new Error(`El Tipo Del Arreglo "${valores.tipo}" No Coincide Con El Tipo Del Arreglo "${node.tipo}".`);
  }
  this.entornoActual.setVariable(node.tipo, node.id1, valores.valor.slice());
}

/**
     * @type {BaseVisitor['visitAccesoArreglo']}
     */
visitAccesoArreglo(node) {
  const arreglo = this.entornoActual.getVariable(node.id);
  const index = node.index.accept(this)
  if (!Array.isArray(arreglo.valor)) {
      throw new Error(`La Variable: "${node.id}" No Es Un Arreglo.`);
  }
  if (index.tipo !== 'int') {
      throw new Error(`El Indice De Acceso Al Arreglo Debe Ser De Tipo Int: "${index.tipo}".`);
  }
  for (let i = 0; i < arreglo.valor.length; i++) {
      if (i === index.valor) {
          return {valor: arreglo.valor[i], tipo: arreglo.tipo};
      }
  }
  throw new Error(`Indice Fuera De Rango: "${index.valor}".`);
}

/**
* @type {BaseVisitor['visitAsignacionArreglo']}
*/
visitAsignacionArreglo(node) {
  const arreglo = this.entornoActual.getVariable(node.id);
  const index = node.index.accept(this);
  const valor = node.valor.accept(this);
  if (!Array.isArray(arreglo.valor)) {
      throw new Error(`La Variable: "${node.id}" No Es Un Arreglo.`);
  }
  if (index.tipo !== 'int') {
      throw new Error(`El Indice De Acceso Al Arreglo Debe Ser De Tipo Int: "${index.tipo}".`);
  }
  if (valor.tipo !== arreglo.tipo) {
      throw new Error(`El Tipo Del Valor "${valor.valor}" No Coincide Con El Tipo Del Arreglo "${arreglo.tipo}".`);
  }
  if (index.valor < 0 || index.valor >= arreglo.valor.length) {
      throw new Error(`Indice Fuera De Rango: "${index.valor}".`);
  }
  arreglo.valor[index.valor] = valor.valor;
  return;
}    

    /**
     * @type {BaseVisitor['visitIndexArreglo']}
     */
    visitIndexArreglo(node) {
      const arreglo = this.entornoActual.getVariable(node.id);
      const index = node.index.accept(this)
      if (!Array.isArray(arreglo.valor)) {
          throw new Error(`La Variable: "${node.id}" No Es Un Arreglo.`);
      }
      if (index.tipo!== arreglo.tipo){
          throw new Error(`El Tipo Del Indice "${index.tipo}" No Coincide Con El Tipo Del Arreglo "${arreglo.tipo}".`);
      }
      for (let i = 0; i < arreglo.valor.length; i++) {
          if (arreglo.valor[i] === index.valor) {
              return {valor: i, tipo: "int"};
          }
      }
      return {valor: -1, tipo:"int"};
  }

  /**
   * @type {BaseVisitor['visitIndexArreglo']}
   */
  visitJoinArreglo(node) {
      let cadena ="";
      const arreglo = this.entornoActual.getVariable(node.id);
      if (!Array.isArray(arreglo.valor)) {
          throw new Error(`La Variable: "${node.id}" No Es Un Arreglo.`);
      }
      for (let i = 0; i < arreglo.valor.length; i++) {
          cadena += arreglo.valor[i].toString();
          if (i < arreglo.valor.length - 1) {
              cadena += ",";
          }
      }
      return {valor: cadena, tipo: "string"};
  }

  /**
   * @type {BaseVisitor['visitLengthArreglo']}
   */
  visitLengthArreglo(node) {
      const arreglo = this.entornoActual.getVariable(node.id);
      if (!Array.isArray(arreglo.valor)) {
          throw new Error(`La Variable: "${node.id}" No Es Un Arreglo.`);
      }
      return {valor: arreglo.valor.length, tipo: "int"};
  }

//////////////////////////////////////////// ARREGLOS N DIMENSIONALES ////////////////////////////////////////////

/**
 * @type {BaseVisitor['visitDeclaracionDimensiones']}
 */
visitDeclaracionDimension(node) {
  const RecorrerMatriz = (valores, tipo) => {
      const Matriz = [];
      for (let valor of valores) {
          if (Array.isArray(valor)) {
              Matriz.push(RecorrerMatriz(valor, tipo));
          } else {
              const ValorActual = valor.accept(this);
              if (ValorActual.tipo !== tipo) {
                  throw new Error(`El Tipo Del Valor "${ValorActual.valor}" No Coincide Con El Tipo Del Arreglo "${tipo}".`);
              }
              Matriz.push(ValorActual.valor);
          }
      }
      return Matriz;
  };
  const NuevaMatriz = RecorrerMatriz(node.valores, node.tipo);
  this.entornoActual.setVariable(node.tipo, node.id, NuevaMatriz);
}

/**
 * @type {BaseVisitor['visitDeclaracion2Dimensiones']}
 */
visitDeclaracion2Dimension(node) {
    if (node.tipo1 !== node.tipo2) {
        throw new Error(`El Tipo De La Matriz "${node.tipo1}" No Coincide Con El Tipo Del La Matriz "${node.tipo2}".`);
    }
    if (node.dimensiones.length !== node.valores.length) {       
        throw new Error(`Las Dimensiones De La Matriz "${node.dimensiones.length}" No Coinciden Con El Número De Valores "${node.valores.length}".`);
    }
    node.valores.forEach((valor, index) => {
        const numero = valor.accept(this);
        if (numero.tipo !== 'int') {
            throw new Error(`La Dimensión ${index + 1} Debe Ser De Tipo Int: "${numero.tipo}".`);
        }
        if (numero.valor < 0) {
            throw new Error(`La Dimensión ${index + 1} No Puede Ser Negativa: "${numero.valor}".`);
        }
    });
    function crearMatriz(Valores, tipo, ValorPorDefecto) {
        const DimensionActual = Valores[0];
        const SubDimension = Valores.slice(1);
        const Matriz = Array(DimensionActual.valor).fill(null);
        if (SubDimension.length > 0) {
            for (let i = 0; i < DimensionActual.valor; i++) {
                Matriz[i] = crearMatriz(SubDimension, tipo, ValorPorDefecto);
            }
        } else {
            Matriz.fill(ValorPorDefecto);
        }
        return Matriz;
    }        
    let ValorPorDefecto;
    switch (node.tipo1) {
        case 'int':
            ValorPorDefecto = 0;
            break;
        case 'float':
            ValorPorDefecto = 0.0;
            break;
        case 'string':
            ValorPorDefecto = '';
            break;
        case 'char':
            ValorPorDefecto = '\0';
            break;
        case 'boolean':
            ValorPorDefecto = false;
            break;
        default:
            throw new Error(`Tipo De Matriz No Válido: "${node.tipo1}".`);
    }
    const NuevaMatriz = crearMatriz(node.valores, node.tipo1, ValorPorDefecto);
    this.entornoActual.setVariable(node.tipo1, node.id, NuevaMatriz);
    console.log(this.entornoActual);
}

/**
 * @type {BaseVisitor['visitAsignacionDimensiones']}
 */
visitAsignacionDimensiones(node) {
    const matriz = this.entornoActual.getVariable(node.id);
    if (!Array.isArray(matriz.valor)) {
        throw new Error(`La Variable: "${node.id}" No Es Una Matriz.`);
    }
    node.valores.forEach((valor, index) => {
        const numero = valor.accept(this);
        if (numero.tipo !== 'int') {
            throw new Error(`El Indice De Acceso "${index + 1}" Debe Ser De Tipo Int: "${numero.tipo}".`);
        }
        if (numero.valor < 0) {
            throw new Error(`El Indice De Acceso "${index + 1}" No Puede Ser Negativa: "${numero.valor}".`);
        }
    });
    if (node.valor.tipo !== matriz.tipo) {
        throw new Error(`El Tipo Del Valor "${valor.valor}" No Coincide Con El Tipo De La Matriz "${arreglo.tipo}".`);
    }
    
    function asignarValor(matriz, indices, nuevoValor) {
        let ref = matriz;
        for (let i = 0; i < indices.length - 1; i++) {
            const idx = indices[i].valor;
            if (idx >= ref.length) {
                throw new Error(`Índice Fuera De Rango: "${idx}" En Dimensión: "${i + 1}".`);
            }
            ref = ref[idx];
        }
        const lastIdx = indices[indices.length - 1].valor;
        if (lastIdx >= ref.length) {
            throw new Error(`Índice Fuera De Rango: "${lastIdx}" En Dimensión: "${indices.length}".`);
        }
        ref[lastIdx] = nuevoValor;
    }
    asignarValor(matriz.valor, node.valores, node.valor.valor);
    return;
}

/**
 * @type {BaseVisitor['visitAccesoDimensiones']}
 */
visitAccesoDimensiones(node) {
    const matriz = this.entornoActual.getVariable(node.id);
    if (!Array.isArray(matriz.valor)) {
        throw new Error(`La Variable: "${node.id}" No Es Una Matriz.`);
    }
    node.valores.forEach((valor, index) => {
        const numero = valor.accept(this);
        if (numero.tipo !== 'int') {
            throw new Error(`El Indice De Acceso "${index + 1}" Debe Ser De Tipo Int: "${numero.tipo}".`);
        }
        if (numero.valor < 0) {
            throw new Error(`El Indice De Acceso "${index + 1}" No Puede Ser Negativa: "${numero.valor}".`);
        }
    });
    for (let i = 0; i < arreglo.valor.length; i++) {
        if (i === index.valor) {
            return {valor: arreglo.valor[i], tipo: arreglo.tipo};
        }
    }
    throw new Error(`Indice Fuera De Rango: "${index.valor}".`);
}
visitAccesoDimensiones(node) {
    const matriz = this.entornoActual.getVariable(node.id);
    
    if (!Array.isArray(matriz.valor)) {
        throw new Error(`La Variable: "${node.id}" No Es Una Matriz.`);
    }
    let ref = matriz.valor;
    node.valores.forEach((valor, index) => {
        const numero = valor.accept(this);
        if (numero.tipo !== 'int') {
            throw new Error(`El Indice De Acceso "${index + 1}" Debe Ser De Tipo Int: "${numero.tipo}".`);
        }
        if (numero.valor < 0) {
            throw new Error(`El Indice De Acceso "${index + 1}" No Puede Ser Negativa: "${numero.valor}".`);
        }
        if (numero.valor >= ref.length) {
            throw new Error(`Índice Fuera De Rango: "${numero.valor}" En Dimensión "${index + 1}".`);
        }
        ref = ref[numero.valor];
    });
    return { valor: ref, tipo: matriz.tipo };
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
  let seEjecutaronCasos = false; // Para rastrear si se ejecutó algún caso
  let huboBreak = false; // Para rastrear si hubo un break

  try {
    for (const caso of node.cases) {
      if (!casoEncontrado && caso.valor.accept(this).valor === node.expre.accept(this).valor) {
        casoEncontrado = true;
      }

      if (casoEncontrado) {
        this.entornoActual = new Entorno(initEntorno);
        seEjecutaronCasos = true;

        for (const sentencia of caso.sentenciasBloque) {
          try {
            sentencia.accept(this);
          } catch (error) {
            if (error instanceof BreakException) {
              // Hubo un break, salir del switch
              huboBreak = true;
              return;
            } else if (error instanceof ContinueException) {
              // Ignorar continue en este contexto
              break;
            } else {
              throw error;
            }
          }
        }
      }
    }

    // Si se ejecutaron casos y no hubo break, ejecutamos el bloque default si existe
    if (seEjecutaronCasos && node.def && !huboBreak) {
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

    // Manejo del caso default si ningún caso fue encontrado y no se ejecutó ningún caso
    if (!seEjecutaronCasos && node.def) {
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

//////////////////////////////////////////// FUNCIONES ////////////////////////////////////////////

/**
 * @type {BaseVisitor['visitLlamada']}
 */
visitLlamada(node) {
  const funcion = node.call.accept(this);
  const argumentos = node.argumentos.map(arg => arg.accept(this));
  if (!(funcion instanceof Invocable)) {
      throw new Error(`La variable "${node.call.id}" no es invocable`);
  }
  if (funcion.aridad() !== argumentos.length) {
      throw new Error(`La función espera ${funcion.aridad()} argumentos, pero se recibieron ${argumentos.length}`);
  }
  return funcion.invocar(this, argumentos);
}
}



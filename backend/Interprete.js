import { BaseVisitor } from './Patron/Visitor.js';
import { Entorno } from './oakLand/Entorno/Entorno.js';
import { BreakException, ContinueException, ReturnException} from './oakLand/Instrucciones/Transferencia.js';
import { Invocable } from './oakLand/Instrucciones/Invocaciones.js';
import { Embebidas } from './oakLand/Instrucciones/funEmbebidas.js';
import { FuncionForanea } from './oakLand/Instrucciones/Funcion.js';
import Hojas, {Expresion} from './Hojas/Hojas.js';
//import { Clase } from './oakLand/Instrucciones/Clase.js';
//import { Instancia } from './oakLand/Instrucciones/instancia.js';

export class InterpreterVisitor extends BaseVisitor {
    constructor() {
        super();
        this.entornoActual = new Entorno();
        Object.entries(Embebidas).forEach(([nombre, funcion]) => {
          this.entornoActual.setVariable('funcion', nombre, funcion);
        });
        this.salida = '';

        this.PrevContinue = null;
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
  // console.log("linea: " , node.location.start.line);  // Imprime el número de línea donde comienza la operación
  // console.log("Columna: " , node.location.end.line);  // Imprime el número de columna donde termina la operación
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
        if ( izq === null || der === null){
          return {valor: null}
        }
        return { valor: izq.valor + der.valor, tipo: esEntero(izq) && esEntero(der) ? 'int' : 'float' };
      } else if (esCadena(izq) && esCadena(der)) {
        return { valor: izq.valor + der.valor, tipo: 'string' };
      } else {
        console.log(node.izq)
        return {valor: null}        
        //throw new Error(`Error: Operación '+' no permitida entre tipos ${izq.tipo} y ${der.tipo}`);
      }

    case '-=':
    case '-':
      if (esNumero(izq) && esNumero(der)) {
        if ( izq === null || der === null){
          return {valor: null}
        }
        return { valor: izq.valor - der.valor, tipo: esEntero(izq) && esEntero(der) ? 'int' : 'float' };
      } else {
        return {valor: null}        
        throw new Error(`Error: Operación '-' no permitida entre tipos ${izq.tipo} y ${der.tipo}`);
      }

    case '*':
      if (esNumero(izq) && esNumero(der)) {
        if ( izq === null || der === null){
          return {valor: null}
        }
        return { valor: izq.valor * der.valor, tipo: esEntero(izq) && esEntero(der) ? 'int' : 'float' };
      } else {
        return {valor: null}        
        throw new Error(`Error: Operación '*' no permitida entre tipos ${izq.tipo} y ${der.tipo}`);
      }

    case '/':
      if (esNumero(izq) && esNumero(der)) {
        if (der.valor === 0) {
          throw new Error('Error: División por cero.');
        }
        let Opizq = izq.valor;
        let Opder = der.valor;
        if (izq.tipo === 'int' && der.tipo === 'int') {
          if ( izq === null || der === null){
            return {valor: null}
          }
          return { valor: parseInt(Opizq / Opder), tipo: 'int' };
        }
        return { valor: Opizq / Opder, tipo: 'float' };
        //return { valor: izq.valor / der.valor, tipo: esEntero(izq) && esEntero(der) ? 'int' : 'float' };
      } else {
        return {valor: null}        
        throw new Error(`Error: Operación '/' no permitida entre tipos ${izq.tipo} y ${der.tipo}`);
      }

    case '%':
      if (esEntero(izq) && esEntero(der)) {
        if (der.valor === 0) {
          throw new Error('Error: Módulo por cero.');
        }
        if ( izq === null || der === null){
          return {valor: null}
        }
        return { valor: parseInt(izq.valor % der.valor), tipo: 'int' };
      } else {
        return {valor: null}        

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
        return {valor: null}        
        throw new Error(`Error: Operación '${node.op}' no permitida entre tipos ${izq.tipo} y ${der.tipo}`);
      }
      return { valor: eval(`izq.valor ${node.op} der.valor`), tipo: 'boolean' };

    case '&&':
    case '||':
      if (izq.tipo !== 'boolean' || der.tipo !== 'boolean') {
        return {valor: null}        
        throw new Error(`Error: Operación lógica '${node.op}' solo permitida entre valores booleanos.`);
      }
      return { valor: eval(`izq.valor ${node.op} der.valor`), tipo: 'boolean' };

    case '!':
      if (izq.tipo !== 'boolean') {
        return {valor: null}        
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
        if ( exp === null){
          return {valor: null}
        }
        return { valor: -exp.valor, tipo: exp.tipo };  // Negación para números
      } else {
        return {valor: null}        
        throw new Error(`Error: El operador '-' solo se permite con valores numéricos, pero recibió un valor de tipo ${exp.tipo}.`);
      }

    case '++':
      if (exp.tipo === 'int') {
        if ( exp === null){
          return {valor: null}
        }
        return { valor: exp.valor + 1, tipo: 'int' };  // Incremento para enteros
      } else if (exp.tipo === 'float') {
        if ( exp === null){
          return {valor: null}
        }
        return { valor: exp.valor + 1, tipo: 'float' };  // Incremento para flotantes
      } else {
        return {valor: null}        
        throw new Error(`Error: El operador '++' solo se permite con valores numéricos, pero recibió un valor de tipo ${exp.tipo}.`);
      }

    case '--':
      if (exp.tipo === 'int') {
        if ( exp === null){
          return {valor: null}
        }
        return { valor: exp.valor - 1, tipo: 'int' };  // Decremento para enteros
      } else if (exp.tipo === 'float') {
        if ( exp === null){
          return {valor: null}
        }
        return { valor: exp.valor - 1, tipo: 'float' };  // Decremento para flotantes
      } else {
        return {valor: null}        
        throw new Error(`Error: El operador '--' solo se permite con valores numéricos, pero recibió un valor de tipo ${exp.tipo}.`);
      }

    case '!':
      if (exp.tipo === 'boolean') {
        return { valor: !exp.valor, tipo: 'boolean' };  // Negación lógica para booleanos
      } else {
        return {valor: null}        
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
  console.log(node.Argumento);
  if (node.Nombre === "Object.keys") {
    console.log("entra a object.keys");
    const ValorStruct = this.entornoActual.getVariable(node.Argumento);
    console.log(ValorStruct);
    if (!ValorStruct) {
      console.log("entra a SEXOOOOOOOOOOOOOO.keys");
      console.log(node.Argumento);
        throw new Error(`La variable ${node.Argumento} no existe en el entorno actual.`);
    }
    const TipoStruct = this.entornoActual.getStruct(ValorStruct.tipo);
    if (!TipoStruct) {
        throw new Error(`El tipo de estructura ${ValorStruct.tipo} no está definido.`);
    }
    let salida = "";
    for (let i = 0; i < TipoStruct.atributos.length; i++) {
        const atributo = TipoStruct.atributos[i].id;
        if (i < TipoStruct.atributos.length - 1) {
            salida += atributo + ",";
        } else {
            salida += atributo;
        }
    }
    return { valor: salida, tipo: "string" };
  }
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
                const TipoStruct = this.entornoActual.getStruct(expresion.tipo);
                if (!TipoStruct) {
                    throw new Error(`El Argumento De typeof Es Tipo Desconocido: "${expresion.tipo}".`);
                }else{
                    return {valor: expresion.tipo, tipo: "string"};
                }                }
      case 'toString':
          return {valor: expresion.valor.toString(), tipo: "string"};
      default:
          throw new Error(`Función Embebida No Válida: "${NombreFuncion}".`);
}
}
//////////////////////////////////////////// SENTENCIAS ////////////////////////////////////////////

/**
  * @type {BaseVisitor['visitExpresionStmt']}
  */
visitExpresionStmt(node) {
  node.exp.accept(this);
}
/**
 * @type {BaseVisitor['visitDeclaracionVariable']}
 */
visitDeclaracionVariable(node) {
  const tipoDeclarado = node.tipoVar;  // Tipo declarado en la declaración
  const nombreVariable = node.id;      // Nombre de la variable
  let valorVariable;
  let tipoFinal = tipoDeclarado;       // Tipo final que se asignará
  let validar = 0;
  
  // Lista de palabras reservadas
  const palabrasReservadas = [
    'int', 'float', 'string', 'boolean', 'char', 'var', 'null', 'true', 
    'false', 'Struct', 'if', 'else', 'switch', 'case', 'break', 
    'default', 'while', 'for', 'continue', 'return', 'typeof', 'toString', 
    'Object', 'indexOf'
  ];

  // Verificar si el nombre de la variable es una palabra reservada
  if (palabrasReservadas.includes(nombreVariable)) {
    throw new Error(`Error: "${nombreVariable}" es una palabra reservada y no puede ser utilizada como nombre de variable.`);
  }


  if (node.exp instanceof Hojas.AsignacionStruct) {
    let tipo = node.tipoVar
    const expresion = node.exp.accept(this)
    if (tipo === "var"){
        tipo = expresion.tipo
    }
    if (tipo != expresion.tipo) {
        throw new Error(`El tipo de la instancia no coincide con el tipo del struct`)
    }
    if (this.entornoActual.getVariable(node.id)) {
        throw new Error(`El id ${node.id} no es un struct`)
    }
    this.entornoActual.setVariable(tipo, node.id, expresion)
    return
  }

  // Si hay una expresión asociada a la variable
  if (node.exp) {
    valorVariable = node.exp.accept(this);  // Obtener valor y tipo desde la expresión
    tipoFinal = tipoDeclarado === 'var' ? valorVariable.tipo : tipoDeclarado;  // Inferir tipo si es 'var'
  } else {
    // Asignar null como valor por defecto para todos los tipos primitivos
    valorVariable = { valor: null, tipo: tipoDeclarado };
  }
  
  // Verificación de tipo con manejo especial para float
  if (tipoFinal !== valorVariable.tipo) {
    if (tipoFinal === 'float' && valorVariable.tipo === 'int') {
      // Convertir el valor entero a float
      valorVariable = { valor: parseFloat(valorVariable.valor), tipo: 'float' };
      this.entornoActual.setVariable(tipoFinal, nombreVariable, valorVariable);
      validar = 1;
    } else {
      //lanzar advertencia que el tipo y la expresion no coinciden
      valorVariable = { valor: null, tipo: tipoFinal };
      this.entornoActual.setVariable(tipoFinal, nombreVariable, valorVariable);
      validar = 1;
      console.warn(`Advertencia: Tipo de la variable "${nombreVariable}" no coincide con el tipo de la expresión. Tipo declarado: ${tipoFinal}, Tipo de la expresión: ${valorVariable.tipo}`);
      //throw new Error(`Tipo de la variable "${nombreVariable}" no coincide con el tipo de la expresión.`);
    }
  }
  console.log("valor de la variable", valorVariable);
  // Definir la variable en el entorno actual
  if (validar === 0)  {
    this.entornoActual.setVariable(tipoFinal, nombreVariable, valorVariable);
  }
    
}

/**
 * @type {BaseVisitor['visitReferenciaVariable']}
 */
visitReferenciaVariable(node) {
  const variable = this.entornoActual.getVariable(node.id);
  if (variable === undefined) {
      throw new Error(`La Variable "${node.id}" No Existe.`);
  }

  let valor = variable.valor;

  if (node.acceso) {
      switch (node.acceso.tipo) {
          case 'arreglo':
              const index = this.visit(node.acceso.index);
              if (!Array.isArray(valor)) {
                  throw new Error(`"${node.id}" no es un arreglo.`);
              }
              if (index < 0 || index >= valor.length) {
                  throw new Error(`Índice fuera de rango para "${node.id}".`);
              }
              valor = valor[index];
              break;
          case 'dimensiones':
              for (const dim of node.acceso.valores) {
                  const dimIndex = this.visit(dim);
                  if (!Array.isArray(valor)) {
                      throw new Error(`Acceso inválido a dimensiones para "${node.id}".`);
                  }
                  if (dimIndex < 0 || dimIndex >= valor.length) {
                      throw new Error(`Índice fuera de rango para una dimensión de "${node.id}".`);
                  }
                  valor = valor[dimIndex];
              }
              break;
      }
  }

  return valor;
}


/**
 * @type {BaseVisitor['visitPrint']}
 */
visitPrint(node) {
  const printValue = (valor) => {
    if (valor.valor === null) {
      return "null";
    } else if (Array.isArray(valor.valor)) {
      return '[' + valor.valor.map(v => printValue({valor: v, tipo: valor.tipo})).join('') + ']';
    } else if (valor.tipo === 'float') {
      if (Number.isInteger(valor.valor)) {
        return valor.valor.toFixed(1);
      }
    }
    return valor.valor;
  };

  const valores = node.exps.map(exp => {
    const valor = exp.accept(this);
    return printValue(valor);
  });

  this.salida += valores.join('') + '\n';
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
  this.entornoActual.setVariable(node.tipo, node.id, { valor: arreglo, tipo: node.tipo });
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
      case 'struct':
          arreglo = Array(numero.valor).fill(null);
          break;
      default:
          throw new Error(`Tipo De Arreglo No Válido: "${node.tipo1}".`);
  }
  this.entornoActual.setVariable(node.tipo1, node.id, { valor: arreglo, tipo: node.tipo1 });
}

/**
* @type {BaseVisitor['visitDeclaracion3Arreglo']}
*/ 
visitDeclaracion3Arreglo(node) {
  const valores = this.entornoActual.getVariable(node.id2).valor;
  if (!Array.isArray(valores.valor)) {
      throw new Error(`La Variable "${node.id2}" No Es Un Arreglo.`);
  }
  if (valores.tipo !== node.tipo) {
      throw new Error(`El Tipo Del Arreglo "${valores.tipo}" No Coincide Con El Tipo Del Arreglo "${node.tipo}".`);
  }
  this.entornoActual.setVariable(node.tipo, node.id1, {valor: valores.valor.slice(), tipo: node.tipo});
}

/**
     * @type {BaseVisitor['visitAccesoArreglo']}
     */
visitAccesoArreglo(node) {
  const arreglo = this.entornoActual.getVariable(node.id).valor;
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
  const arreglo = this.entornoActual.getVariable(node.id).valor;
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
  }  // Modificación principal: permitir asignar null si el tipo no coincide
  if (valor.tipo !== arreglo.tipo) {
    console.warn(`Advertencia: El Tipo Del Valor "${valor.valor}" No Coincide Con El Tipo Del Arreglo "${arreglo.tipo}". Se asignará null.`);
    arreglo.valor[index.valor] = null;
  } else {
    arreglo.valor[index.valor] = valor.valor;
  }

  return;
}    

/**
 * @type {BaseVisitor['visitIndexArreglo']}
 */
visitIndexArreglo(node) {
  const arreglo = this.entornoActual.getVariable(node.id).valor;
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
      const arreglo = this.entornoActual.getVariable(node.id).valor;
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
    // Si no hay posición (queremos la longitud total del arreglo de la primera dimensión)
    if (node.posicion.length === 0) {
        const arreglo = this.entornoActual.getVariable(node.id).valor;
        if (!Array.isArray(arreglo.valor)) {
            throw new Error(`La Variable: "${node.id}" No Es Un Arreglo.`);
        }
        return {valor: arreglo.valor.length, tipo: "int"};
    } else {
        // Si hay posiciones, navegamos por cada una
        const arreglo = this.entornoActual.getVariable(node.id).valor;
        if (!Array.isArray(arreglo.valor)) {
            throw new Error(`La Variable: "${node.id}" No Es Un Arreglo.`);
        }

        let ref = arreglo.valor;

        // Recorremos las posiciones para navegar en las dimensiones del arreglo
        for (let i = 0; i < node.posicion.length; i++) {
            const numero = node.posicion[i].accept(this);

            if (numero.tipo !== 'int') {
                throw new Error(`El Índice De Acceso "${i + 1}" Debe Ser De Tipo Int: "${numero.tipo}".`);
            }
            if (!Array.isArray(ref)) {
                throw new Error(`La Referencia En La Dimensión "${i + 1}" No Es Un Arreglo.`);
            }
            if (numero.valor < 0 || numero.valor >= ref.length) {
                throw new Error(`Índice Fuera De Rango: "${numero.valor}" En Dimensión "${i + 1}".`);
            }

            // Actualizamos la referencia al siguiente nivel del arreglo
            ref = ref[numero.valor];
        }

        // Después de recorrer las posiciones, verificamos si ref aún es un arreglo
        if (!Array.isArray(ref)) {
            throw new Error(`La Referencia Final No Es Un Arreglo, No Se Puede Obtener Su Longitud.`);
        }

        return {valor: ref.length, tipo: "int"};
}
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
  this.entornoActual.setVariable(node.tipo, node.id, {valor: NuevaMatriz, tipo: node.tipo});
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
    this.entornoActual.setVariable(node.tipo1, node.id, {valor: NuevaMatriz, tipo: node.tipo1});
    console.log(this.entornoActual);
}

/**
 * @type {BaseVisitor['visitAsignacionDimensiones']}
 */
visitAsignacionDimensiones(node) {
  const matriz = this.entornoActual.getVariable(node.id).valor;
  const nuevoValor = node.nuevoValor.accept(this);
  
  // Verificar si la variable es una matriz
  if (!Array.isArray(matriz.valor)) {
    throw new Error(`La Variable: "${node.id}" No Es Una Matriz.`);
  }
  
  // Verificar tipos y rangos de los índices
  let subMatriz = matriz.valor;
  node.indices.forEach((indice, index) => {
    const numero = indice.accept(this);
    if (numero.tipo !== 'int') {
      throw new Error(`El Índice De Acceso "${index + 1}" Debe Ser De Tipo Int: "${numero.tipo}".`);
    }
    if (numero.valor < 0 || numero.valor >= subMatriz.length) {
      throw new Error(`Índice Fuera De Rango: "${numero.valor}" En Dimensión "${index + 1}".`);
    }
    
    // Avanzar en la matriz multidimensional
    if (index < node.indices.length - 1) {
      subMatriz = subMatriz[numero.valor];
      if (!Array.isArray(subMatriz)) {
        throw new Error(`La Variable En Dimensión "${index + 2}" No Es Una Matriz.`);
      }
    } else {
      // Último nivel, asignar el nuevo valor o null si los tipos no coinciden
      if (nuevoValor.tipo !== matriz.tipo) {
        console.warn(`Advertencia: El Tipo Del Valor "${nuevoValor.valor}" (${nuevoValor.tipo}) No Coincide Con El Tipo De La Matriz "${matriz.tipo}". Se asignará null.`);
        subMatriz[numero.valor] = null;
      } else {
        subMatriz[numero.valor] = nuevoValor.valor;
      }
    }
  });
  
  return { tipo: 'void', valor: null };
}


/**
 * @type {BaseVisitor['visitAccesoDimensiones']}
 */
visitAccesoDimensiones(node) {
  const matriz = this.entornoActual.getVariable(node.id).valor;
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
  node.instrucciones.forEach(instrucciones => instrucciones.accept(this));
  this.entornoActual = entornoAnterior;
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
console.log("entra a while");
console.log(node.cond);
console.log(node.instrucciones);

  const EntornoInicial = this.entornoActual;
  const condicion = node.cond.accept(this);
  if (condicion.tipo !== 'boolean') {
      throw new Error('Error: La Condición En Una Estructura While Debe Ser De Tipo Boolean.');
  }
  try {
      while (node.cond.accept(this).valor) {
          node.instrucciones.accept(this);
      }
  } catch (error) {
      this.entornoActual = EntornoInicial;
      if (error instanceof BreakException) {
          return
      }
      if (error instanceof ContinueException) {
          return this.visitWhile(node);
      }
      throw error;
}


  // const initEntorno = this.entornoActual;
  // while (true) {
  //   try {
  //     if (!node.cond.accept(this).valor) {
  //       break;
  //     }
  //     node.sentencias.accept(this);
  //   } catch (error) {
  //     if (error instanceof BreakException) {
  //       break;
  //     } else if (error instanceof ContinueException) {
  //       continue;
  //     } else {
  //       throw error;
  //     }
  //   }
  // }

  // this.entornoActual = initEntorno;
}

/**
 * @type {BaseVisitor['visitFor']}
 */
visitFor(node) {
  const PrevIncremento = this.PrevContinue;
  this.PrevContinue = node.inc;
  const ImplementacionFor = new Hojas.Bloque({
    instrucciones: [
          node.init,
          new Hojas.While({
            cond: node.cond,
            instrucciones: new Hojas.Bloque({
                instrucciones: [
                      node.sentencias,
                      node.inc
                  ]
              })
          })
      ]
  })
  ImplementacionFor.accept(this);
  this.PrevContinue = PrevIncremento;
}

/**
 * @type {BaseVisitor['visitForEach']}
 */
visitForEach(node) {
        // Obtener el arreglo del entorno
        const id2 = this.entornoActual.getVariable(node.id2).valor;
        // Validar que sea un arreglo
        if (!Array.isArray(id2.valor)) {
            throw new Error(`La Variable: "${node.id2}" No Es Un Arreglo.`);
        }
        // Validar que el tipo del arreglo coincide con el tipo declarado en el foreach
        if (node.tipo !== id2.tipo) {
            throw new Error(`El Tipo Del Arreglo "${id2.tipo}" No Coincide Con El Tipo De La Variable "${node.tipo}".`);
        }
        // Recorrer el arreglo
        for (let elemento of id2.valor) {
            // Crear un nuevo entorno para cada iteración
            const entornoNuevo = new Entorno(this.entornoActual);
            // Setear la variable iteradora con el valor actual del arreglo
            entornoNuevo.setTemporal(node.tipo, node.id, { valor: elemento, tipo: node.tipo });
            // Proteger la variable iteradora para que no pueda ser reasignada
            entornoNuevo.assignVariable = function(nombre, valor) {
                if (nombre === node.id) {
                    throw new Error(`La Variable "${nombre}" No Puede Ser Reasignada Dentro De Un Foreach.`);
                }
                Entorno.prototype.assignVariable.call(this, nombre, valor);
            };
            // Establecer el nuevo entorno como el actual
            const entornoAnterior = this.entornoActual;
            this.entornoActual = entornoNuevo;
            try {
                // Ejecutar el bloque de sentencias
                node.sentencias.accept(this);
            } catch (error) {
                // Restaurar el entorno anterior si ocurre un error
                this.entornoActual = entornoAnterior;
                throw error;
            }
            // Restaurar el entorno anterior al final de la iteración
            this.entornoActual = entornoAnterior;
        }
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
  if (this.PrevContinue) {
    this.PrevContinue.accept(this);
}
throw new ContinueException();
}

/**
 * @type {BaseVisitor['visitReturn']}
 */
visitReturn(node) {
  let valor = null
  if (node.exp) {
      valor = node.exp.accept(this);
  }
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
  // if (funcion.aridad() > 0) {
  //   funcion.node.argumentos.forEach((param, i) => {
  //       const argumento = argumentos[i];
  //       if (param.tipo !== argumento.tipo) {
  //           throw new Error(`El argumento en la posición ${i + 1} debe ser de tipo "${param.tipo}", pero se recibió "${argumento.tipo}".`);
  //       }
  //   });
  //}
  return funcion.invocar(this, argumentos);
}

/**
 * @type {BaseVisitor['visitDeclaracionFuncion']}
 */
visitDeclaracionFuncion(node) {
  console.log(node.bloque)
  console.log(node.id)
  console.log(node.tipo)
  console.log(node.params)
  
        // Validar nombres de parámetros únicos
        const nombres = node.params.map(param => param.id);
        const nombresUnicos = new Set(nombres);
        if (nombres.length !== nombresUnicos.size) {
            throw new Error(`Los parámetros de la función "${node.id}" no deben tener el mismo nombre.`);
        }

        const funcion = new FuncionForanea(node, this.entornoActual);
        this.entornoActual.setVariable(node.tipo, node.id, funcion);
}

//////////////////////////////////////////// STRUCTS ////////////////////////////////////////////

/**
     * @type {BaseVisitor['visitStruct']}
     */
visitStruct(node) {
  let AtrubutosStruct = [];
  node.atributos.forEach(atributo => {
      const tipo = atributo.tipo;
      const id = atributo.id;
      if(this.entornoActual.getVariable(id)) {
          throw new Error(`Variable ${id} no puede ser un atributo para un struct `)
      }
      if(tipo != "int" && tipo != "string" && tipo != "float" && tipo != "boolean" && tipo != "char" ) {
          if(!this.entornoActual.getStruct(tipo)) throw new Error(`El struct ${id} no esta definido`) 
      }
      if(AtrubutosStruct.some(item => item.id == id)) throw new Error(`Atributo ${id} ya esta declarado en el struct`)
      AtrubutosStruct.push({tipo, id})
  });
  this.entornoActual.setStruct(node.id, AtrubutosStruct);
}

/**
* @type {BaseVisitor['visitAsignacionStruct']}
*/
visitAsignacionStruct(node) {
  const tipo = node.tipo
  const atributos = node.atributos
  const TipoStruct = this.entornoActual.getStruct(tipo)
  let StructTemporal = {}
  atributos.forEach(atributo => {
      const id = atributo.id
      if (!TipoStruct.atributos.some(item => item.id == id)){
          throw new Error(`El atributo ${id} no esta definido en el struct`)
      }
      const valor = atributo.expresion.accept(this)
      if (TipoStruct.atributos.find(item => item.id == id).tipo !== valor.tipo) {
          if (!(TipoStruct.atributos.find(item => item.id == id).tipo === "float" && valor.tipo === "int")) {
              throw new Error(`El tipo del valor no coincide con el tipo del atributo ${id}`)
          }
      }
      StructTemporal[id] = valor
  });
  return {valor: StructTemporal, tipo: tipo}
}

/**
* @type {BaseVisitor['visitAccesoAtributo']}
*/
visitAccesoAtributo(node) {
  const instancia = node.instancia;
  const atributos = node.atributo;
  let Struct = this.entornoActual.getVariable(instancia);
  if (Struct === undefined) {
      throw new Error(`La variable ${instancia} no es un struct o no existe`);
  }
  let ref = Struct.valor;
  for (let i = 0; i < atributos.length; i++) {
      const atributo = atributos[i];
      if (!ref.valor[atributo]) {
          throw new Error(`El atributo ${atributo} no está definido en el struct ${instancia}`);
      }
      ref = ref.valor[atributo];
  }
  return { valor: ref.valor, tipo: ref.tipo };
}

/**
* @type {BaseVisitor['visitAsignacionAtributo']}
*/
visitAsignacionAtributo(node) {
  const instancia = node.instancia;
  const atributos = node.atributo;
  const valor = node.expresion.accept(this);
  this.entornoActual.assignStruct(instancia, atributos, valor);
  console.log(this.entornoActual)
  return;
}

//////////////////////////////////////////// CLASES ////////////////////////////////////////////


// /**
//      * @type { BaseVisitor['visitStruct'] }
//     */
// visitStruct(node) {
//   const id = node.id
  
//   let arrayAtributos = []

//   const primerAtri = node.atrib1

//   if(this.entornoActual.getVariable(primerAtri.id)) throw new Error(`Variable ${primerAtri.id} no puede ser un atributo para un struct `)

//   if(primerAtri.tipo != "int" && primerAtri.tipo != "string" && primerAtri.tipo != "float" && primerAtri.tipo != "boolean" && primerAtri.tipo != "char" ) {
//       if(!this.entornoActual.getStruct(primerAtri.tipo)) throw new Error(`El struct ${primerAtri.id} no esta definido`) 
//   }

//   arrayAtributos.push({tipo:primerAtri.tipo, id: primerAtri.id})

//   node.atrib2.forEach(atributo => {
//       const tipo = atributo.tipo
//       const id = atributo.id

//       if(this.entornoActual.getVariable(id)) throw new Error(`Variable ${id} no puede ser un atributo para un struct `)

//       if(tipo != "int" && tipo != "string" && tipo != "float" && tipo != "boolean" && tipo != "char" ) {
//           if(!this.entornoActual.getStruct(tipo)) throw new Error(`El struct ${id} no esta definido`) 
//       }

//       if(arrayAtributos.some(item => item.id == id)) throw new Error(`Atributo ${id} ya esta declarado en el struct`)
//       arrayAtributos.push({tipo, id})
//   })

//   this.entornoActual.setStruct(id, arrayAtributos)
// }

//       /**
// * @type { BaseVisitor['visitInstanciaE'] }
// */
// visitInstanciaE(node) {
//   // const id = node.id
//   const tipo = node.tipo
//   const atributos = node.atributos//.map(atributo => atributo.accept(this))
//   let structTemp = {}
//   const estructura = this.entornoActual.getStruct(tipo)
//   atributos.forEach(atributo => {
//       const id = atributo.id
//       if(!estructura.atributos.some(item => item.id == id)) throw new Error(`El atributo ${id} no esta definido en el struct`)
//       const valor = atributo.exp.accept(this)
//       if (estructura.atributos.find(item => item.id == id).tipo !== valor.tipo) {
//           if (!(estructura.atributos.find(item => item.id == id).tipo === "float" && valor.tipo === "int")) {
//               throw new Error(`El tipo del valor no coincide con el tipo del atributo ${id}`);
//           }
//       }
//       structTemp[id] = valor
//   })
//   console.log("ESTO retornaraia", {valor: structTemp})
//   return {valor: structTemp, tipo: tipo}
// }

// /**
// * @type { BaseVisitor['visitInstanciaS'] }
// */
// visitInstanciaS(node) {

//   const tipo = node.tipo
//   // const tipo2 = node.tipo2
//   const id = node.id
//   const exp = node.exp.accept(this)

//   if(tipo != exp.tipo) throw new Error(`El tipo de la instancia no coincide con el tipo del struct`)

//   if(this.entornoActual.getVariable(id)) throw new Error(`El id ${id} no es un struct`)

//   if(!this.entornoActual.getStruct(tipo)) throw new Error(`El struct ${tipo} no esta definido`)

//   //this.entornoActual.setVariable(tipo, id, exp.valor)
//   this.entornoActual.setVariable(node.tipo, node.id, exp)
//   console.log("Entorno")
//   console.log(this.entornoActual)
// }

// /**
// * @type { BaseVisitor['visitAtributo'] }
// */
// visitAtributo(node) {
//   console.log("ACCEDIENDO ATRIBUTO")
//   console.log(node.atributo)
//   console.log(node.restoA)
//   console.log(node.instancia)
//   console.log("SALIENDO DEL ACCESO ATRIBUTO")
//   const id = node.instancia
//   const atributos = [node.atributo, ...node.restoA]

//   const struct = this.entornoActual.getVariable(id)
//   console.log("Struct completo:", JSON.stringify(struct, null, 2))
//   if(struct == undefined) throw new Error(`El id ${id} no es un struct o no existe`)

//   // ASIGNACION
//   if(node.asignacion){
//       console.log("Asignación de atributo")
//       const valor = node.asignacion.accept(this)

//       this.entornoActual.actualizarInstancia(id, atributos, valor)
//       return valor
//   }

//   let valorActual = struct.valor // Empezamos desde el valor del struct
//   console.log("Atributos a acceder:", atributos)
//   for( const atributo of atributos) {
//       console.log(`Intentando acceder a: ${atributo}`)
//       console.log(`Valor actual:`, JSON.stringify(valorActual, null, 2))
//       if (!(atributo in valorActual)) {
//           throw new Error(`El atributo ${atributo} no está definido en el struct`)
//       }

//       valorActual = valorActual[atributo]
//   }
//   console.log("Valor final:", valorActual)
//   return valorActual // Retornamos directamente el valor encontrado
// }



  //   /**
  //   * @type {BaseVisitor['visitDeclaracionClase']}
  //   */
  //   visitDeclaracionClase(node) {

  //     const metodos = {}
  //     const propiedades = {}

  //     node.dcls.forEach(dcl => {
  //         if (dcl instanceof Hojas.DeclaracionFuncion) {
  //             metodos[dcl.id] = new FuncionForanea(dcl, this.entornoActual);
  //         } else if (dcl instanceof Hojas.DeclaracionVariable) {
  //             propiedades[dcl.id] = dcl.exp
  //         }
  //     });

  //     const clase = new Clase(node.id, propiedades, metodos);

  //     this.entornoActual.setVariable(node.id, clase);

  // }
  // /**
  //   * @type {BaseVisitor['visitInstancia']}
  //   */
  // visitInstancia(node) {
  //   const clase = this.entornoActual.getVariable(node.id);

  //   const argumentos = node.args.map(arg => arg.accept(this));


  //   if (!(clase instanceof Clase)) {
  //       throw new Error('No es posible instanciar algo que no es una clase');
  //   }



  //   return clase.invocar(this, argumentos);
  // }


  //     /**
  //    * @type {BaseVisitor['visitAsignacion']}
  //    */
  //     visitAsignacion(node) {
  //       // const valor = this.interpretar(node.asgn);
  //       const valor = node.asgn.accept(this);
  //       this.entornoActual.assignVariable(node.id, valor);

  //       return valor;
  //   }

  //     /**
  //   * @type {BaseVisitor['visitGet']}
  //   */
  //     visitGet(node) {

  //       // var a = new Clase();
  //       // a.propiedad
  //       const instancia = node.objetivo.accept(this);

  //       if (!(instancia instanceof Instancia)) {
  //           console.log(instancia);
  //           throw new Error('No es posible obtener una propiedad de algo que no es una instancia');
  //       }

  //       return instancia.get(node.propiedad);
  //   }

  //   /**
  //   * @type {BaseVisitor['visitSet']}
  //   */
  //   visitSet(node) {
  //       const instancia = node.objetivo.accept(this);

  //       if (!(instancia instanceof Instancia)) {
  //           throw new Error('No es posible asignar una propiedad de algo que no es una instancia');
  //       }

  //       const valor = node.valor.accept(this);

  //       instancia.set(node.propiedad, valor);

  //       return valor;
  //   }
}



// import { FuncionForanea } from "./Funcion.js";
// import { Instancia } from "./instancia.js";
// import { Invocable } from "./Invocaciones.js";
// import { Expresion } from "../../Hojas/Hojas.js";


// export class Clase extends Invocable {

//     constructor(nombre, propiedades, metodos) {
//         super();

//         /**
//          * @type {string}
//          */
//         this.nombre = nombre;

//         /**
//          * @type {Object.<string, Expresion>}
//          */
//         this.propiedades = propiedades;

//         /**
//          * @type {Object.<string, FuncionForanea>}
//          */
//         this.metodos = metodos;
//     }

//     /**
//     * @param {string} nombre
//     * @returns {FuncionForanea | null}
//     */
//     buscarMetodo(nombre) {
//         if (this.metodos.hasOwnProperty(nombre)) {
//             return this.metodos[nombre];
//         }
//         return null;
//     }

//     aridad() {
//         const constructor = this.buscarMetodo('constructor');

//         if (constructor) {
//             return constructor.aridad();
//         }

//         return 0;
//     }


//     /**
//     * @type {Invocable['invocar']}
//     */
//     invocar(interprete, args) {
//         const nuevaIntancia = new Instancia(this);

//         /*
//         class asdasd {
//             var a = 2;

//             constructor(a) {
//                 this.a = 4;
//                 this.b = 4;
//             }   
//         }
//     */
//         // valores por defecto
//         Object.entries(this.propiedades).forEach(([nombre, valor]) => {
//             nuevaIntancia.set(nombre, valor.accept(interprete));
//         });

//         const constructor = this.buscarMetodo('constructor');
//         if (constructor) {
//             constructor.atar(nuevaIntancia).invocar(interprete, args);
//         }

//         return nuevaIntancia;
//     }

// }
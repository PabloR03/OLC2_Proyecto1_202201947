import { Entorno } from "../Entorno/Entorno.js";
import { Invocable } from "./Invocaciones.js";
import { DeclaracionFuncion } from "../../Hojas/Hojas.js";
import { ReturnException, BreakException, ContinueException} from "./Transferencia.js";


export class FuncionForanea extends Invocable {


    constructor(nodo, clousure) {
        super();
        /**
         * @type {DeclaracionFuncion}
         */
        this.nodo = nodo;

        /**
         * @type {Entorno}
         */
        this.clousure = clousure;
    }

    aridad() {
        return this.nodo.params.length;
    }


    /**
    * @type {Invocable['invocar']}
    */
    invocar(interprete, args) {
        const entornoNuevo = new Entorno(this.clousure);

        this.nodo.params.forEach((param, i) => {
            entornoNuevo.setVariable(param.tipo, param.id, args[i]);
        });

        const entornoAntesDeLaLlamada = interprete.entornoActual;
        interprete.entornoActual = entornoNuevo;

        try {
            this.nodo.bloque.accept(interprete);
        } catch (error) {
            interprete.entornoActual = entornoAntesDeLaLlamada;
            if (error instanceof ReturnException) {
                // Verificar si la función es de tipo 'void' y si 'ReturnException' tiene un valor
                if (this.nodo.tipo === 'void' && error.value !== null) {
                    throw new Error(`Una función de tipo 'void' no puede retornar un valor.`);
                }
                if (this.nodo.tipo != error.value.tipo) {
                    throw new Error(`El tipo de retorno no coincide con el esperado ${this.nodo.tipo} != ${error.value.tipo}`);
                }
                return error.value;
            }
            throw error;
        }
        interprete.entornoActual = entornoAntesDeLaLlamada;
        return null;
    }

    // atar(instancia) {
    //     const entornoOculto = new Entorno(this.clousure);
    //     entornoOculto.setVariable('this', instancia);
    //     return new FuncionForanea(this.nodo, entornoOculto);
    // }



}
import { InterpreterVisitor } from "../../Interprete.js";
import { Entorno } from '../Entorno/Entorno.js'

export class Invocable {


    aridad() {
        throw new Error('No implementado');
    }

    /**
     * @param interprete {InterpreterVisitor}
     * @param args {any[]}
     */
    invocar(interprete, args) {
        throw new Error('No implementado');
    }

}
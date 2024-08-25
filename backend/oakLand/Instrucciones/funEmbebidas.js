import { Invocable } from "./Invocaciones.js";

class FuncionNativa extends Invocable {
    constructor(aridad, func) {
        super();
        this._aridad = aridad;
        this._func = func;
    }

    aridad() {
        return this._aridad;
    }

    invocar(interprete, args) {
        return this._func(...args);
    }
}

export const Embebidas = {
    parseInt: new FuncionNativa(1, (arg) => ({ valor: parseInt(arg.valor), tipo: "int" })),
    parseFloat: new FuncionNativa(1, (arg) => ({ valor: parseFloat(arg.valor), tipo: "float" })),
    //toString: new FuncionNativa(1, (arg) => ({ valor: arg.valor.toString(), tipo: "string" })),
    toLowerCase: new FuncionNativa(1, (arg) => ({ valor: arg.valor.toLowerCase(), tipo: "string" })),
    toUpperCase: new FuncionNativa(1, (arg) => ({ valor: arg.valor.toUpperCase(), tipo: "string" })),
    //typeof: new FuncionNativa(1, (arg) => ({ valor: typeof arg.valor, tipo: "string" })),
    
};
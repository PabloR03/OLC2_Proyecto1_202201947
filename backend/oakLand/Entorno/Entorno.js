export class Entorno {
    constructor() {
        this.valores = {};
    }

    /**
     * @param {string} tipo
     * @param {string} nombre
     * @param {any} valor
     */
    setVariable(tipo, nombre, valor) {
        this.tipo = tipo;
        this.valores[nombre] = valor;
    }

    /**
     * @param {string} nombre
     */
    getVariable(nombre) {
        return this.valores[nombre];
    }
}
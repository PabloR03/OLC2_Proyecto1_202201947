export class Entorno {
    /**
     * @param {Entorno} padre
     */
    constructor(padre = undefined) {
        this.valores = {};
        this.padre = padre;
    }

    /**
     * @param {string} nombre
     * @param {any} valor
     */
    setVariable(tipo, nombre, valor) {
        if (this.valores[nombre]) {
            throw new Error(`La Variable: "${nombre}" Ya Está Definida.`);
        }
        this.valores[nombre] = { valor, tipo};
    }

    /**
     * @param {string} nombre
     */
    getVariable(nombre) {
        const variable = this.valores[nombre];
        if (variable!=undefined) {
            return variable;
        }
        if (!variable && this.padre) {
            return this.padre.getVariable(nombre);
        }
        throw new Error(`La Variable "${nombre}" No Está Definida.`);
    }

    setTemporal(tipo, nombre, valor) {
        if(this.valores[nombre]) {
            throw new Error(`La Variable: "${nombre}" Ya Está Definida.`);
        }
        this.valores[nombre] = {valor, tipo}
}

    /**
     * @param {string} nombre
     * @param {any} valor
     */ assignVariable(nombre, valor) {
        const variable = this.valores[nombre];
        if (variable !== undefined) {
            if (this.esAsignacionValida(variable.tipo, valor.tipo, valor.valor)) {
                if (variable.tipo === 'float' && valor.tipo === 'int') {
                    valor.valor = parseFloat(valor.valor);
                    valor.tipo = 'float';
                }
                this.valores[nombre].valor = { valor: valor.valor, tipo: valor.tipo };
            } else {
                console.warn(`Advertencia: Tipo no coincidente para la variable "${nombre}". Se asignará null.`);
                this.valores[nombre].valor = { valor: null, tipo: variable.tipo };
            }
            return;
        }
        if (this.padre) {
            this.padre.assignVariable(nombre, valor);
            return;
        }
        console.warn(`Advertencia: La Variable "${nombre}" no está definida. No se puede asignar.`);
    }

    esAsignacionValida(tipoVariable, tipoValor, valor) {
        if (tipoVariable === tipoValor) return true;
        if (tipoVariable === 'float' && tipoValor === 'int') return true;
        if (tipoVariable === 'string' && typeof valor === 'string') return true;
        if (tipoVariable === 'boolean' && typeof valor === 'boolean') return true;
        if (tipoVariable === 'char' && typeof valor === 'string' && valor.length === 1) return true;
        return false;
    }
}
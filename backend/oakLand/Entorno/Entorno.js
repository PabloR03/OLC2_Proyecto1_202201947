export class Entorno {
    /**
     * @param {Entorno} padre
     */
    constructor(padre = undefined) {
        this.valores = {};
        this.structs = {}
        this.padre = padre;
    }

    /**
     * @param {string} nombre
     * @param {any} valor
     */
    setVariable(tipo, nombre, valor) {
        if (this.valores[nombre]) {
            console.log(nombre)
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
        //throw new Error(`La Variable "${nombre}" No Está Definida.`);
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

    setStruct(nombre, atributos) {
        if(this.valores[nombre]) throw new Error(`ID ${nombre} ya esta declarado.`)
        if(this.structs[nombre]) throw new Error(`Estructura ${nombre} ya esta declarada.`)

        this.structs[nombre] = {nombre, atributos}

        console.log("HOLAAA")
    }


    /**
     * @param {string} nombre 
     */
    getStruct(nombre) {
        const actual = this.structs[nombre]

        if(actual != undefined) {
            console.log(actual)
            return actual
        }

        if(!actual && this.padre) {
            return this.padre.getStruct(nombre)
        }
    }


    actualizarInstancia(nombre, atributos, valor) {
        const actual = this.valores[nombre]
        if (actual !== undefined) {
            let struct = this.getStruct(actual.tipo)
            let ref = actual
            
            for (let i = 0; i < atributos.length - 1; i++) {
                const atributo = atributos[i]
                
                if (!ref.valor[atributo]) {
                    throw new Error(`El atributo ${atributo} no existe en la variable ${nombre}`)
                }

                if (typeof ref.valor[atributo].valor !== 'object') {
                    throw new Error(`El atributo ${atributo} no es una estructura en la variable ${nombre}`)
                }
                
                // Actualizar struct si el tipo no es básico
                struct = this.getStruct(ref.valor[atributo].tipo);
                ref = ref.valor[atributo]
            }
            
            const ultimoAtributo = atributos[atributos.length - 1]
            
            // Obtener el tipo del atributo desde el struct actualizado
            const tipoAtributo = struct.atributos.find(item => item.id === ultimoAtributo).tipo
            
            // Validar el tipo
            if (valor.tipo === "int" && tipoAtributo === "float") {
                ref.valor[ultimoAtributo] = valor
                console.log("ahoraaa", this.valores)
                return
            } else if (tipoAtributo !== valor.tipo) {
                throw new Error(`El tipo del atributo ${ultimoAtributo} no coincide con el tipo del valor proporcionado`)
            } else {
                ref.valor[ultimoAtributo] = valor
                console.log("ahoraaa", this.valores)
                return;
            }
        }
        
        if (!actual && this.padre) {
            this.padre.actualizarInstancia(nombre, atributos, valor)
            return
        }
        
        throw new Error(`Variable ${nombre} no declarada`)
}
}
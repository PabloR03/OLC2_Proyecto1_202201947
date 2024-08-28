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

export function mostrarTablaSimbolos(entorno) {
    const tablaSimbolosHTML = generarTablaSimbolos(entorno);
    
    // Abrir una nueva pestaña
    const nuevaVentana = window.open('', '_blank');
    
    // Escribir la tabla en la nueva pestaña
    nuevaVentana.document.write(`
        <html>
        <head>
            <title>Tabla de Símbolos</title>
            <style>
                table {
                    font-family: Arial, sans-serif;
                    border-collapse: collapse;
                    width: 100%;
                }
                th, td {
                    border: 1px solid #dddddd;
                    text-align: left;
                    padding: 8px;
                }
                th {
                    background-color: #f2f2f2;
                }
            </style>
        </head>
        <body>
            <h1>Tabla de Símbolos</h1>
            ${tablaSimbolosHTML}
        </body>
        </html>
    `);
    
    nuevaVentana.document.close();

    function generarTablaSimbolos(entorno) {
        let tablaSimbolosHTML = `
            <table border="1" style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        // Recorrer el entorno para generar filas de la tabla
        for (let nombre in entorno.valores) {
            const variable = entorno.valores[nombre];
            tablaSimbolosHTML += `
                <tr>
                    <td>${nombre}</td>
                    <td>${variable.tipo}</td>
                    <td>${variable.valor}</td>
                </tr>
            `;
        }
        
        tablaSimbolosHTML += `
                </tbody>
            </table>
        `;
        
        return tablaSimbolosHTML;
    }
    
    function mostrarTablaSimbolos(entorno) {
        const tablaSimbolosHTML = generarTablaSimbolos(entorno);
        
        // Abrir una nueva pestaña
        const nuevaVentana = window.open('', '_blank');
        
        // Escribir la tabla en la nueva pestaña
        nuevaVentana.document.write(`
            <html>
            <head>
                <title>Tabla de Símbolos</title>
                <style>
                    table {
                        font-family: Arial, sans-serif;
                        border-collapse: collapse;
                        width: 100%;
                    }
                    th, td {
                        border: 1px solid #dddddd;
                        text-align: left;
                        padding: 8px;
                    }
                    th {
                        background-color: #f2f2f2;
                    }
                </style>
            </head>
            <body>
                <h1>Tabla de Símbolos</h1>
                ${tablaSimbolosHTML}
            </body>
            </html>
        `);
        
        nuevaVentana.document.close();
    }
}

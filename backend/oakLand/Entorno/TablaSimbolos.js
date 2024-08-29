import { Entorno } from './Entorno.js';

export function mostrarTablaSimbolos(entorno) {
    const tablaSimbolosHTML = generarTablaSimbolos(entorno);
    
    // Abrir una nueva pestaña
    const nuevaVentana = window.open('', '_blank');
    
    // Escribir la tabla en la nueva pestaña
    nuevaVentana.document.write(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Tabla de Símbolos</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 20px;
                }
                h1 {
                    color: #333;
                }
                table {
                    border-collapse: collapse;
                    width: 100%;
                    margin-top: 20px;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 12px;
                    text-align: left;
                }
                th {
                    background-color: #f2f2f2;
                    font-weight: bold;
                }
                tr:nth-child(even) {
                    background-color: #f9f9f9;
                }
                tr:hover {
                    background-color: #f5f5f5;
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

function generarTablaSimbolos(entorno) {
    let tablaSimbolosHTML = `
        <table>
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
                <td>${JSON.stringify(variable.valor)}</td>
            </tr>
        `;
    }
    
    tablaSimbolosHTML += `
            </tbody>
        </table>
    `;
    
    return tablaSimbolosHTML;
}
import { parse } from './Analizador.js';

export function recorrer(nodo) {
    if (nodo.tipo === 'numero') return nodo.valor;

    const num1 = recorrer(nodo.num1);
    const num2 = recorrer(nodo.num2);

    switch (nodo.tipo) {
        case "suma":
            return num1 + num2;
        case "multiplicacion":
            return num1 * num2;
        default:
            throw new Error("Tipo de operación no soportada: " + nodo.tipo);
    }
}

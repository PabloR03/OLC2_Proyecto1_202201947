import { parse } from './Analizador.js';

let lastAST = null;

export function inicializarInterprete() {
    const txtEntrada = document.getElementById('txtEntrada');
    const txtSalida = document.getElementById('txtSalida');
    const nlEntrada = document.getElementById('nlEntrada');
    const nlSalida = document.getElementById('nlSalida');
    const btnEjecutar = document.getElementById('btnEjecutar');
    const btnReporteAST = document.getElementById('btnReporteAST');

    if (!txtEntrada || !txtSalida || !nlEntrada || !nlSalida || !btnEjecutar) {
        console.error("Uno o más elementos necesarios no se encontraron en el DOM");
        return;
    }

    function actualizarNumLineas(textarea, lineNumbers) {
        const lines = textarea.value.split('\n').length;
        lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join('<br>');
    }

    function syncScroll(textarea, lineNumbers) {
        lineNumbers.scrollTop = textarea.scrollTop;
    }

    function handleInput() {
        actualizarNumLineas(txtEntrada, nlEntrada);
        actualizarNumLineas(txtSalida, nlSalida);
    }

    function ejecutarCodigo() {
        const codigo = txtEntrada.value;
        try {
            const arbol = parse(codigo);
            lastAST = arbol;
            console.log("AST:", JSON.stringify(arbol, null, 2));
            const resultado = recorrer(arbol);
            txtSalida.value = resultado.toString();
            console.log("Resultado:", resultado);
        } catch (error) {
            txtSalida.value = "Error: " + error.message;
            console.error("Error al ejecutar:", error);
            lastAST = null;
        }
        actualizarNumLineas(txtSalida, nlSalida);
    }

    function recorrer(nodo) {
        if (nodo.tipo === 'numero') return nodo.valor;

        const num1 = recorrer(nodo.num1);
        const num2 = recorrer(nodo.num2);

        switch (nodo.tipo) {
            case "suma":
                return num1 + num2;
            case "multiplicacion":
                return num1 * num2;
            default:
                return 0;
        }
    }

    function generarReporteAST() {
        if (lastAST) {
            console.log("Reporte AST:", JSON.stringify(lastAST, null, 2));
            alert("Reporte AST generado. Revisa la consola.");
        } else {
            alert("No hay AST disponible. Ejecuta el código primero.");
        }
    }

    txtEntrada.addEventListener('input', handleInput);
    txtEntrada.addEventListener('scroll', () => syncScroll(txtEntrada, nlEntrada));
    txtSalida.addEventListener('scroll', () => syncScroll(txtSalida, nlSalida));
    btnEjecutar.addEventListener('click', ejecutarCodigo);
    if (btnReporteAST) {
        btnReporteAST.addEventListener('click', generarReporteAST);
    }

    handleInput();
}

export function obtenerAST() {
    return lastAST;
}
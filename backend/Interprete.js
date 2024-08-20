import { parse } from './Analizador.js';
let lastAST = null;
document.addEventListener("DOMContentLoaded", function() {
    // Elementos del DOM
    const txtEntrada = document.getElementById('txtEntrada');
    const txtSalida = document.getElementById('txtSalida');
    const nlEntrada = document.getElementById('nlEntrada');
    const nlSalida = document.getElementById('nlSalida');
    const fileInput = document.getElementById('fileInput');
    const abrirArchivo = document.getElementById('abrirArchivo');
    const nuevoArchivo = document.getElementById('nuevoArchivo');
    const guardarArchivo = document.getElementById('guardarArchivo');
    const btnEjecutar = document.getElementById('btnEjecutar');

    // CONTROLADORES DE BOTONES
        // Verificar si todos los elementos necesarios existen
        if (!txtEntrada || !txtSalida || !nlEntrada || !nlSalida || !btnEjecutar) {
            console.error("Uno o más elementos necesarios no se encontraron en el DOM");
            return; // Salir si faltan elementos críticos
        }

        const btnReporteAST = document.getElementById('btnReporteAST');
        if (btnReporteAST) {
            btnReporteAST.addEventListener('click', generarReporteAST);
        }

    // Funciones principales
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

    function obtenerAST() {
        return lastAST;
    }

    function generarReporteAST() {
        const ast = obtenerAST();
        if (ast) {

            // Aquí puedes implementar la lógica para generar el reporte

            // Por ahora, solo mostraremos el AST en la consola
            console.log("Reporte AST:", JSON.stringify(ast, null, 2));
            alert("Reporte AST generado. Revisa la consola.");
        } else {
            alert("No hay AST disponible. Ejecuta el código primero.");
        }
    }

    // Funciones de manejo de archivos
        function handleFileUpload(event) {
            const file = event.target.files[0];
            if (file && file.name.endsWith('.oak')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    txtEntrada.value = e.target.result;
                    handleInput();
                };
                reader.readAsText(file);
            } else {
                alert('Por favor, seleccione un archivo con la extensión .oak.');
            }
        }

        function guardarArchivoContent(content, filename) {
            const blob = new Blob([content], { type: 'text/plain' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            link.click();
        }

        function handleNewFile() {
            if (txtEntrada.value.trim() !== "") {
                const shouldSave = confirm("¿Desea guardar el archivo actual antes de crear uno nuevo?");
                if (shouldSave) {
                    handleSaveFile();
                }
            }
            txtEntrada.value = "";
            txtSalida.value = "";
            handleInput();
        }

        function handleSaveFile() {
            const filename = prompt("Ingrese el nombre del archivo (con la extensión .oak):", "ArchivoGuardado.oak");
            if (filename) {
                guardarArchivoContent(txtEntrada.value, filename);
            }
        }

    function ejecutarCodigo() {
        const codigo = txtEntrada.value;
        try {
            const arbol = parse(codigo);
            lastAST = arbol; // Guardamos el AST para uso posterior
            console.log("AST:", JSON.stringify(arbol, null, 2)); // Mostrar AST en la consola
            const resultado = recorrer(arbol);
            txtSalida.value = resultado.toString();
            console.log("Resultado:", resultado); // Para depuración
        } catch (error) {
            txtSalida.value = "Error: " + error.message;
            console.error("Error al ejecutar:", error);
            lastAST = null; // Reseteamos el AST en caso de error
        }
        actualizarNumLineas(txtSalida, nlSalida);
    }
    

    // Función de recorrido del AST
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

    // Event Listeners
    txtEntrada.addEventListener('input', handleInput);
    txtEntrada.addEventListener('scroll', () => syncScroll(txtEntrada, nlEntrada));
    txtSalida.addEventListener('scroll', () => syncScroll(txtSalida, nlSalida));
    btnEjecutar.addEventListener('click', ejecutarCodigo);
    abrirArchivo.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileUpload);
    nuevoArchivo.addEventListener('click', handleNewFile);
    guardarArchivo.addEventListener('click', handleSaveFile);

    // Inicialización
    handleInput();
});
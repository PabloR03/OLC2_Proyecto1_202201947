let lastAST = null;
import { parse } from '../backend/Analizador.js';
import { InterpreterVisitor } from '../backend/Interprete.js'
import { mostrarTablaSimbolos } from '../backend/oakLand/Entorno/TablaSimbolos.js';

export function inicializarManejadorArchivos() {
    const txtEntrada = document.getElementById('txtEntrada');
    const txtSalida = document.getElementById('txtSalida');
    const fileInput = document.getElementById('fileInput');
    const abrirArchivo = document.getElementById('abrirArchivo');
    const nuevoArchivo = document.getElementById('nuevoArchivo');
    const guardarArchivo = document.getElementById('guardarArchivo');
    const tablaSimbolos = document.getElementById('tablaSimbolos');

    function handleFileUpload(event) {
        const file = event.target.files[0];
        if (file && file.name.endsWith('.oak')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            txtEntrada.value = e.target.result;
            actualizarNumLineas(txtEntrada, document.getElementById('nlEntrada'));
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
        actualizarNumLineas(txtEntrada, document.getElementById('nlEntrada'));
        actualizarNumLineas(txtSalida, document.getElementById('nlSalida'));
        }

    function handleSaveFile() {
        const filename = prompt("Ingrese el nombre del archivo (con la extensión .oak):", "ArchivoGuardado.oak");
        if (filename) {
        guardarArchivoContent(txtEntrada.value, filename);
        }
    }

    function actualizarNumLineas(textarea, lineNumbers) {
        const lines = textarea.value.split('\n').length;
        lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join('<br>');
    }

    abrirArchivo.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileUpload);
    nuevoArchivo.addEventListener('click', handleNewFile);
    guardarArchivo.addEventListener('click', handleSaveFile);
}

export function inicializarInterprete() {
    const txtEntrada = document.getElementById('txtEntrada');
    const txtSalida = document.getElementById('txtSalida');
    const nlEntrada = document.getElementById('nlEntrada');
    const nlSalida = document.getElementById('nlSalida');
    const btnEjecutar = document.getElementById('btnEjecutar');
    const tablaSimbolosBtn = document.getElementById('tablaSimbolos');

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

    function obtenerEntorno() {
        return interprete.entorno;
    }

    function ejecutarCodigo() {
        const codigo = txtEntrada.value;
        txtSalida.value = '';  // Limpiar antes de comenzar
        try {
            const sentencias = parse(codigo);
            const interprete = new InterpreterVisitor();
            
            sentencias.forEach(sentencia => {
                try {
                    sentencia.accept(interprete);
                } catch (errorSentencia) {
                    txtSalida.value += `Error en sentencia: ${errorSentencia.message}\n`;
                    console.error("Error en sentencia:", errorSentencia);
                }
            });
            console.log({sentencias});
            console.log(JSON.stringify(sentencias, null, 2));
            //console.log(interprete.salida);
            txtSalida.value += interprete.salida;  // Añadir salida al final
        } catch (error) {
            txtSalida.value += "Error general: " + error.message + "\n";
            console.error("Error general:", error);
        }
    
        actualizarNumLineas(txtSalida, nlSalida);
    }
    
    txtEntrada.addEventListener('input', handleInput);
    txtEntrada.addEventListener('scroll', () => syncScroll(txtEntrada, nlEntrada));
    txtSalida.addEventListener('scroll', () => syncScroll(txtSalida, nlSalida));
    btnEjecutar.addEventListener('click', ejecutarCodigo);

    handleInput();
}

export function obtenerAST() {
    return lastAST;
}
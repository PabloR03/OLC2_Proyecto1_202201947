export function inicializarManejadorArchivos() {
    const txtEntrada = document.getElementById('txtEntrada');
    const txtSalida = document.getElementById('txtSalida');
    const fileInput = document.getElementById('fileInput');
    const abrirArchivo = document.getElementById('abrirArchivo');
    const nuevoArchivo = document.getElementById('nuevoArchivo');
    const guardarArchivo = document.getElementById('guardarArchivo');

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
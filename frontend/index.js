document.addEventListener("DOMContentLoaded", function() {
    const inputBox = document.getElementById('inputBox');
    const outputBox = document.getElementById('outputBox');
    const lineNumbersInput = document.getElementById('lineNumbersInput');
    const lineNumbersOutput = document.getElementById('lineNumbersOutput');
    const fileInput = document.getElementById('fileInput');
    const loadFile = document.getElementById('loadFile');
    const newFileButton = document.getElementById('newFile');
    const saveFileButton = document.getElementById('saveFile'); // Nuevo id para el botón de guardar

    function updateLineNumbers(textarea, lineNumbers) {
        const lines = textarea.value.split('\n').length;
        lineNumbers.innerHTML = Array(lines).fill(0).map((_, i) => i + 1).join('<br>');
    }

    function syncScroll(textarea, lineNumbers) {
        lineNumbers.scrollTop = textarea.scrollTop;
    }

    function handleInput() {
        const inputValue = inputBox.value;
        outputBox.value = inputValue;
        updateLineNumbers(inputBox, lineNumbersInput);
        updateLineNumbers(outputBox, lineNumbersOutput);
    }

    function handleFileUpload(event) {
        const file = event.target.files[0];
        if (file && file.name.endsWith('.oak')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                inputBox.value = e.target.result;
                outputBox.value = inputBox.value;
                updateLineNumbers(inputBox, lineNumbersInput);
                updateLineNumbers(outputBox, lineNumbersOutput);
            };
            reader.readAsText(file);
        } else {
            alert('Por favor, seleccione un archivo con la extensión .oak.');
        }
    }

    function saveFile(content, filename) {
        const blob = new Blob([content], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    }

    function handleNewFile() {
        if (inputBox.value.trim() !== "") {
            const shouldSave = confirm("¿Desea guardar el archivo actual antes de crear uno nuevo?");
            if (shouldSave) {
                const filename = prompt("Ingrese el nombre del archivo (con la extensión .oak):", "NuevoArchivo.oak");
                if (filename) {
                    saveFile(inputBox.value, filename);
                }
            }
        }
        inputBox.value = "";
        outputBox.value = "";
        updateLineNumbers(inputBox, lineNumbersInput);
        updateLineNumbers(outputBox, lineNumbersOutput);
    }

    function handleSaveFile() {
        const filename = prompt("Ingrese el nombre del archivo (con la extensión .oak):", "ArchivoGuardado.oak");
        if (filename) {
            saveFile(inputBox.value, filename);
        }
    }

    inputBox.addEventListener('input', handleInput);
    inputBox.addEventListener('scroll', () => syncScroll(inputBox, lineNumbersInput));
    outputBox.addEventListener('scroll', () => syncScroll(outputBox, lineNumbersOutput));

    updateLineNumbers(inputBox, lineNumbersInput);
    updateLineNumbers(outputBox, lineNumbersOutput);

    loadFile.addEventListener('click', function() {
        fileInput.click();
    });

    fileInput.addEventListener('change', handleFileUpload);

    newFileButton.addEventListener('click', handleNewFile);

    saveFileButton.addEventListener('click', handleSaveFile); // Nuevo evento para el botón de guardar
});

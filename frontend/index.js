import { inicializarInterprete, inicializarManejadorArchivos } from './ManejadorArchivos.js';

document.addEventListener("DOMContentLoaded", function() {
    inicializarInterprete();
    inicializarManejadorArchivos();
});
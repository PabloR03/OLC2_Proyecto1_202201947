import { inicializarInterprete } from '../backend/Interprete.js';
import { inicializarManejadorArchivos } from '../backend/ManejadorArchivos.js';

document.addEventListener("DOMContentLoaded", function() {
    inicializarInterprete();
    inicializarManejadorArchivos();
});
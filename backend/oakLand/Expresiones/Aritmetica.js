import { BaseVisitor } from '../../Patron/Visitor.js';

export class operacionAritmeticaVisitor extends BaseVisitor {
    /**
     * @param {BaseVisitor} interpreter
     */
    constructor(interpreter) {
        super();
        this.interpreter = interpreter;
    }

    /**
     * @type {BaseVisitor['visitOperacionBinaria']}
     */
    visitOperacionAritmetica(node) {
        const izq = node.izq.accept(this.interpreter);
        const der = node.der.accept(this.interpreter);

        switch (node.op) {
            case '+':
                return izq + der;
            case '-':
                return izq - der;
            case '*':
                return izq * der;
            case '/':
                return izq / der;
            case '%':
                return izq % der;
            default:
                throw new Error(`Operador no soportado: ${node.op}`);
        }
    }
}
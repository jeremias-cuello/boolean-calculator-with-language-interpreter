import { StackOperant } from "./StackOperant";
import { StackOperator } from "./StackOperator";
import { Operant } from "./Operant";
import { Operator } from "./Operator";
import { Token } from "./Token";

class InterpreterSingleton {

    private static instance: InterpreterSingleton;
    private expression: string = "";
    private tokens: Token[] = [];
    private expressionTokenized: Token[] = [];
    private stackOperants: StackOperant = StackOperant.getInstance();
    private stackOperators: StackOperator = StackOperator.getInstance();

    private constructor() { }

    public static getInstancia(): InterpreterSingleton {

        if (InterpreterSingleton.instance == null) {
            InterpreterSingleton.instance = new InterpreterSingleton();
        }

        return InterpreterSingleton.instance;
    }

    public tokenize(): void {
        // console.group("validate"); // DEBUG

        let validated: boolean = false;

        for (let i = 0; i < this.Expression.length; i++) {
            const c = this.Expression[i];
            // console.log("c = ", c); // DEBUG
            validated = false;

            for (let j = 0; j < this.tokens.length && !validated; j++) {
                const t = this.tokens[j];
                // console.log("t = ", t.symbol); // DEBUG
                if (c === t.symbol) {
                    validated = true;
                    this.expressionTokenized.push(t);
                }
            }

            if (!validated) throw new Error(`Syntaxis Error: Unexpected '${c}'`);
        }

        // console.log("this.expressionTokenized");  // DEBUG
        // console.log(this.expressionTokenized.map(t => t.symbol));  // DEBUG
        // console.groupEnd(); // DEBUG
    }

    public parse(): void {

        console.log("stackOperants = ", this.stackOperants.toString());
        console.log("stackOperators = ", this.stackOperators.toString());

        console.group('for');
        for (const token of this.expressionTokenized) {
            console.log("stackOperants = ", this.stackOperants.toString());
            console.log("stackOperators = ", this.stackOperators.toString());
            console.log("token = ", token.symbol);

            if (token instanceof Operant) {
                console.group("is operant");
                this.stackOperants.push(token);
                console.groupEnd();
            }
            else if (token instanceof Operator) {
                console.group("IsOperador");
                const opCurrent = token;

                // Mientras la pila de operadores no esté vacía y el operador en la parte superior de la pila tenga mayor o igual prioridad que el operador actual
                while (
                    !this.stackOperators.isEmpty() &&
                    this.stackOperators.peek().priority >= opCurrent.priority
                ) {
                    console.group("pop-operator-stack");
                    let result: Operant = new Operant("q", false);
                    // Desapila el operador de la pila de operadores
                    const operator = this.stackOperators.pop();

                    // Desapila uno o dos operandos de la pila de operandos (según si el operador es unario o binario)
                    // Luego aplica el operador anterior guardando el resultado
                    if (operator.quantityOperands == 2) {
                        const secondOperand = this.stackOperants.pop();
                        const firstOperand = this.stackOperants.pop();
                        result = operator.evaluate(firstOperand, secondOperand);

                        console.log(`${firstOperand.symbol} ${operator.symbol} ${secondOperand.symbol}`); // DEBUG
                        console.log(`${firstOperand.value} ${operator.symbol} ${secondOperand.value}`); // DEBUG
                        console.log(`result = ${result}`); // DEBUG
                    }
                    else if (operator.quantityOperands == 1) {
                        const operand = this.stackOperants.pop();
                        result = operator.evaluate(operand);

                        console.log(`${operator.symbol} ${operand.symbol}`); // DEBUG
                        console.log(`${operator.symbol} ${operand.value}`); // DEBUG
                        console.log(`result = ${result}`); // DEBUG
                    }

                    // Coloca el resultado en la pila de operandos
                    this.stackOperants.push(result);

                    console.log("stackOperants = ", this.stackOperants.toString());
                    console.log("stackOperators = ", this.stackOperators.toString());
                    console.groupEnd();
                } // end-while

                // Push at Stack of Operators to current operator
                this.stackOperators.push(opCurrent);
                console.log("stackOperants = ", this.stackOperants.toString());
                console.log("stackOperators = ", this.stackOperators.toString());
                console.groupEnd();
            }
            console.log("-----------------------------------");

        }

        console.log("stackOperants = ", this.stackOperants.toString());
        console.log("stackOperators = ", this.stackOperators.toString());
        console.groupEnd(); // end for
    }

    public execute(): boolean {
        while (!this.stackOperators.isEmpty()) {
            console.group("execute");
            let result: Operant = new Operant("q", false);
            // Desapila el operador de la pila de operadores
            const operator = this.stackOperators.pop();

            // Desapila uno o dos operandos de la pila de operandos (según si el operador es unario o binario)
            // Luego aplica el operador anterior guardando el resultado
            if (operator.quantityOperands == 2) {
                const secondOperand = this.stackOperants.pop();
                const firstOperand = this.stackOperants.pop();
                result = operator.evaluate(firstOperand, secondOperand);

                console.log(`${firstOperand.symbol} ${operator.symbol} ${secondOperand.symbol}`); // DEBUG
                console.log(`${firstOperand.value} ${operator.symbol} ${secondOperand.value}`); // DEBUG
                console.log(`result = ${result}`); // DEBUG
            }
            else if (operator.quantityOperands == 1) {
                const operand = this.stackOperants.pop();
                result = operator.evaluate(operand);

                console.log(`${operator.symbol} ${operand.symbol}`); // DEBUG
                console.log(`${operator.symbol} ${operand.value}`); // DEBUG
                console.log(`result = ${result}`); // DEBUG
            }

            // Coloca el resultado en la pila de operandos
            this.stackOperants.push(result);

            console.log("stackOperants = ", this.stackOperants.toString());
            console.log("stackOperators = ", this.stackOperators.toString());
            console.groupEnd();
        }

        const result = this.stackOperants.pop().value;

        console.log("stackOperants = ", this.stackOperants.toString());
        console.log("stackOperators = ", this.stackOperators.toString());

        return result;
    }

    public addToken(t: Token): void {
        this.tokens.push(t);
    }

    //#region set and get Expression
    public set Expression(v: string) {
        this.expression = v.replace(/\s+/g, ""); // remove spaces
    }

    public get Expression(): string {
        return this.expression;
    }
    //#endregion
}

export { InterpreterSingleton as Interpreter };

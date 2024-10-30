import { StackOperant } from "./StackOperant";
import { StackOperator } from "./StackOperator";
import { Operant } from "./Operant";
import { Operator } from "./Operator";
import { Token } from "./Token";

class InterpreterSingleton {

    private static instance: InterpreterSingleton;
    private expression: string = "";
    private tokens: Token[] = [];

    private constructor(expression: string) {
        this.Expression = expression;
    }

    public static getInstancia(expression: string): InterpreterSingleton {

        if (InterpreterSingleton.instance == null) {
            InterpreterSingleton.instance = new InterpreterSingleton(expression);
        }

        return InterpreterSingleton.instance;
    }

    public validate(): void {
        // console.group("validate"); // DEBUG

        let validated: boolean = false;

        for (let i = 0; i < this.Expression.length; i++) {
            const c = this.Expression[i];
            // console.log("c = ", c); // DEBUG
            validated = false;

            for (let j = 0; j < this.tokens.length && !validated; j++) {
                const t = this.tokens[j];
                // console.log("t = ", t.Symbol); // DEBUG
                if (c === t.Symbol) {
                    validated = true;
                }
            }

            if (!validated) throw new Error(`Syntaxis Error: Unexpected '${c}'`);
        }

        // console.groupEnd(); // DEBUG

    }

    public parse(): void {
        const stackOperants = new StackOperant();
        const stackOperators = new StackOperator();

        console.log("stackOperants = ", stackOperants);
        console.log("stackOperators = ", stackOperators);

        for (const token of this.tokens) {
            console.group('for');
            console.log("stackOperants = ", stackOperants);
            console.log("stackOperators = ", stackOperators);
            console.log("token = ", token);

            if (token instanceof Operant) {
                console.log("is operant");
                stackOperants.push(token);
            }
            else if (token instanceof Operator) {
                console.group("IsOperador");
                const operatorBefore = stackOperators.peek();
                const operatorCurrent = token;

                console.log("operatorBefore", operatorBefore);

                // Mientras la pila de operadores no esté vacía y el operador en la parte superior de la pila tenga mayor o igual prioridad que el operador actual
                while (!stackOperators.isEmpty() && operatorBefore.QuantityOperands >= operatorCurrent.QuantityOperands) {
                    let result: Operant = new Operant("", false);

                    // Desapila el operador de la pila de operadores
                    const operator = stackOperators.pop();

                    // Desapila uno o dos operandos de la pila de operandos (según si el operador es unario o binario)
                    // Luego aplica el operador anterior y guarda el resultado en la pila de operandos
                    if (operator.QuantityOperands == 2) {
                        const secondOperand = stackOperants.pop();
                        const firstOperand = stackOperants.pop();
                        result = operator.evaluate(firstOperand, secondOperand);
                    }
                    else if (operator.QuantityOperands == 1) {
                        const operand = stackOperants.pop();
                        result = operator.evaluate(operand);
                    }

                    // Coloca el resultado en la pila de operandos
                    stackOperants.push(result);
                }

                // Push at Stack of Operators to current operator
                stackOperators.push(operatorCurrent);

                console.groupEnd();
            }

            console.groupEnd(); // end for
        }

        console.groupEnd();
    }

    public addToken(t: Token): void {
        this.tokens.push(t);
    }

    //#region set and get Expression
    /**
     * @description remove spaces
     */
    public set Expression(v: string) {
        this.expression = v.replace(/\s+/g, "");
    }

    public get Expression(): string {
        return this.expression;
    }
    //#endregion
}

export { InterpreterSingleton as Interpreter };

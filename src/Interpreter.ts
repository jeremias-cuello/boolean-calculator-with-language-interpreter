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

    public tokenization(): void {
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
                    this.expressionTokenized.push(t);
                }
            }

            if (!validated) throw new Error(`Syntaxis Error: Unexpected '${c}'`);
        }

        // console.groupEnd(); // DEBUG
        console.log("this.expressionTokenized");
        console.log(this.expressionTokenized);

    }

    public parse(): void {

        console.log("stackOperants = ", this.stackOperants);
        console.log("stackOperators = ", this.stackOperators);

        for (const token of this.tokens) {
            console.group('for');
            console.log("stackOperants = ", this.stackOperants);
            console.log("stackOperators = ", this.stackOperators);
            console.log("token = ", token);

            if (token instanceof Operant) {
                console.log("is operant");
                this.stackOperants.push(token);
            }
            else if (token instanceof Operator) {
                console.group("IsOperador");
                const operatorBefore = this.stackOperators.peek();
                const operatorCurrent = token;

                console.log("operatorBefore", operatorBefore);

                // Mientras la pila de operadores no esté vacía y el operador en la parte superior de la pila tenga mayor o igual prioridad que el operador actual
                while (!this.stackOperators.isEmpty() && operatorBefore.QuantityOperands >= operatorCurrent.QuantityOperands) {
                    let result: Operant = new Operant("", false);

                    // Desapila el operador de la pila de operadores
                    const operator = this.stackOperators.pop();

                    // Desapila uno o dos operandos de la pila de operandos (según si el operador es unario o binario)
                    // Luego aplica el operador anterior guardando el resultado
                    if (operator.QuantityOperands == 2) {
                        const secondOperand = this.stackOperants.pop();
                        const firstOperand = this.stackOperants.pop();
                        result = operator.evaluate(firstOperand, secondOperand);
                    }
                    else if (operator.QuantityOperands == 1) {
                        const operand = this.stackOperants.pop();
                        result = operator.evaluate(operand);
                    }

                    // Coloca el resultado en la pila de operandos
                    this.stackOperants.push(result);
                }

                // Push at Stack of Operators to current operator
                this.stackOperators.push(operatorCurrent);

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
    public set Expression(v: string) {
        this.expression = v.replace(/\s+/g, ""); // remove spaces
    }

    public get Expression(): string {
        return this.expression;
    }
    //#endregion
}

export { InterpreterSingleton as Interpreter };

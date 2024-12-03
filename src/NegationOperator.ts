import { CalculatorSingleton } from "./Calculator";
import { Operant } from "./Operant";
import { Operator } from "./Operator";

class NegationOperator extends Operator/*  implements IOperatorUnary  */{

    private calculator: CalculatorSingleton = CalculatorSingleton.getInstance();

    public override evaluate(operant: Operant): Operant {

        const value: boolean = this.calculator.negation(operant.value);
        const symbol = `${this.calculator.CounterOperandsAuxiliar}`;

        const result: Operant = new Operant(symbol, value);

        return result;
    }
}

export { NegationOperator };

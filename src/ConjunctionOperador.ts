import { CalculatorSingleton } from "./Calculator";
import { Operant } from "./Operant";
import { Operator } from "./Operator";

class ConjunctionOperator extends Operator {

    private calculator: CalculatorSingleton = CalculatorSingleton.getInstance();

    public override evaluate(firstOperant: Operant, secondOperant: Operant): Operant {

        const value: boolean = this.calculator.conjunction(firstOperant.value, secondOperant.value);
        const symbol = `${this.calculator.CounterOperandsAuxiliar}`;

        const result: Operant = new Operant(symbol, value);

        return result;
    }
}

export { ConjunctionOperator };

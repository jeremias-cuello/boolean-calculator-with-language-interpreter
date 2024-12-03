import { CalculatorSingleton } from "./Calculator";
import { Operant } from "./Operant";
import { Operator } from "./Operator";

class DisyunctionOperator extends Operator /* implements IOperatorBinary  */{

    private calculator: CalculatorSingleton = CalculatorSingleton.getInstance();

    public override evaluate(firstOperant: Operant, secondOperant: Operant): Operant {

        const value: boolean = this.calculator.disjunction(firstOperant.value, secondOperant.value);
        const symbol = `${this.calculator.CounterOperandsAuxiliar}`;

        const result: Operant = new Operant(symbol, value);

        return result;
    }
}

export { DisyunctionOperator };

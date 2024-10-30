class CalculatorSingleton {

    private static instance: CalculatorSingleton;
    public CounterOperandsAuxiliar: number;

    private constructor() {
        this.CounterOperandsAuxiliar = 0;
    }

    public static getInstance(): CalculatorSingleton {
        if (CalculatorSingleton.instance == null) {
            CalculatorSingleton.instance = new CalculatorSingleton();
        }

        return CalculatorSingleton.instance
    }

    public disjunction(firstOperand: boolean, secondOperand: boolean): boolean {
        this.CounterOperandsAuxiliar++;
        return firstOperand || secondOperand;
    }

    public conjunction(firstOperand: boolean, secondOperand: boolean): boolean {
        this.CounterOperandsAuxiliar++;
        return firstOperand && secondOperand;
    }

    public negation(operand: boolean): boolean {
        this.CounterOperandsAuxiliar++;
        return !operand;
    }
}

export { CalculatorSingleton };

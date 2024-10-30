import { Operant } from "./Operant";

interface IOperatorBinary {
    evaluate(firstOperant: Operant | undefined, secondOperant: Operant | undefined): Operant;
}

export { IOperatorBinary };

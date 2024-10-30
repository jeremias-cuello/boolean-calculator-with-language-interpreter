import { Operant } from "./Operant";

interface IOperatorUnary {
    evaluate(operand: Operant | undefined): Operant;
}

export { IOperatorUnary }

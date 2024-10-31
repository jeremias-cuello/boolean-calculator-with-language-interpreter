import { Operator } from "./Operator";
import { Stack } from "./Stack";

class StackOperator implements Stack<Operator>{
    private operators: Operator[] = [];

    public push(operator: Operator): void {
        this.operators.push(operator);
    }

    public pop(): Operator {
        const op = this.operators.pop();

        if(typeof op === 'undefined'){
            throw new Error("underflow");
        }

        return op;
    }

    public peek(): Operator {
        const index = this.size() - 1;

        if (index < 0) throw new Error("Stack is empty");

        return this.operators[index];
    }

    public size(): number {
        return this.operators.length;
    }

    public isEmpty(): boolean {
        return this.operators.length == 0;
    }
}

export { StackOperator };
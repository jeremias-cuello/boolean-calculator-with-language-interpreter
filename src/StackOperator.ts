import { Operator } from "./Operator";
import { IStack } from "./Stack";

class StackOperatorSingleton implements IStack<Operator>{
    private operators: Operator[] = [];
    private static instance: StackOperatorSingleton;

    private constructor() { }
    public static getInstance(){
        if(StackOperatorSingleton.instance == null){
            StackOperatorSingleton.instance = new StackOperatorSingleton();
        }

        return StackOperatorSingleton.instance;
    }

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

export { StackOperatorSingleton as StackOperator };

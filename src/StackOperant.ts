import { Operant } from "./Operant";
import { Stack } from "./Stack";

class StackOperant implements Stack<Operant>{
    private operants: Operant[] = [];

    public push(operant: Operant): void {
        this.operants.push(operant);
    }

    public pop(): Operant{
        const op = this.operants.pop();

        if (typeof op === 'undefined') {
            throw new Error("underflow");
        }

        return op;
    }
}

export { StackOperant };

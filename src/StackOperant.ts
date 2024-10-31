import { Operant } from "./Operant";
import { Stack } from "./Stack";

class StackOperantSingleton implements Stack<Operant>{
    private operants: Operant[] = [];

    private static instance:StackOperantSingleton;

    private constructor() { }

    public static getInstance(){
        if(StackOperantSingleton.instance == null){
            StackOperantSingleton.instance = new StackOperantSingleton();
        }

        return StackOperantSingleton.instance;
    }

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

export { StackOperantSingleton };

import { Token } from "./Token";

class Operator extends Token {

    private priority : number = 0;
    private quantityOperands : number = 0;

    public constructor(symbol: string, quantityOperands: number, priority: number){
        super(symbol);
        this.QuantityOperands = quantityOperands;
        this.Priority = priority;
    }

    //#region set and get quantityOperands
    public set QuantityOperands(v : number) {
        if(v >= 1){
            this.quantityOperands = v;
        }
        else {
            throw new Error("quantity invalidated");
        }
    }

    public get QuantityOperands() : number {
        return this.quantityOperands;
    }

    //#endregion
    //#region set and get Priority
    public get Priority() : number {
        return this.priority;
    }

    public set Priority(v : number) {
        if(v >= 1){
            this.priority = v;
        }
        else {
            throw new Error("priority invalidated");
        }
    }

    //#endregion

    public override toString() : string {
        return `Operator: { ${super.toString()}, Priority: ${this.Priority}, QuantityOperands: ${this.QuantityOperands} }`;
    }
}

export { Operator };

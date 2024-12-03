import { Operant } from "./Operant";
import { Token } from "./Token";

abstract class Operator extends Token {

    private _priority: number = 0;
    private _quantityOperands: number = 0;

    public constructor(symbol: string, quantityOperands: number, priority: number) {
        super();
        this.symbol = symbol;
        this.quantityOperands = quantityOperands;
        this.priority = priority;
    }

    /**
     * DEV: validate symbol
     */
    public override set symbol(v: string) {
        this._symbol = v;
    }

    public override get symbol() {
        return this._symbol;
    }

    //#region set and get quantityOperands
    public set quantityOperands(v: number) {
        if (v >= 1) {
            this._quantityOperands = v;
        }
        else {
            throw new Error("quantity invalidated");
        }
    }

    public get quantityOperands(): number {
        return this._quantityOperands;
    }

    //#endregion
    //#region set and get Priority
    public get priority(): number {
        return this._priority;
    }

    public set priority(v: number) {
        if (v >= 1) {
            this._priority = v;
        }
        else {
            throw new Error("priority invalidated");
        }
    }

    //#endregion
    //#region toString
    public override toString(): string {
        return `Operator: { ${super.toString()}, Priority: ${this.priority}, QuantityOperands: ${this.quantityOperands} }`;
    }
    //#endregion

    abstract evaluate(firstOperant: Operant | undefined, secondOperant?: Operant | undefined): Operant;
}

export { Operator };

import { Token } from "./Token";

class Operant extends Token {

    public value: boolean;

    public constructor(symbol: string = "@", value: boolean = false) {
        super();
        this.symbol = symbol
        this.value = value

        // if(typeof symbol != 'undefined') this.symbol = symbol;
        // else this.symbol = "@";
        // if(typeof value != 'undefined') this.value = value;
        // else this.value = false;
    }

    public override set symbol(v: string){
        this._symbol = v;
    }

    public override get symbol(): string{
        return this._symbol;
    }

    public override toString(): string {
        return `Operant: { ${super.toString()}, value: ${this.value} }`;
    }

}

export { Operant };

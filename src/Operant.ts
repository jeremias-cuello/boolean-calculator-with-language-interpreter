import { Token } from "./Token";

class Operant extends Token {

    public Value: boolean;

    public constructor(symbol: string, value: boolean) {
        super(symbol);
        this.Value = value;
    }

    public override toString(): string {
        return `Operant: { ${super.toString()}, value: ${this.Value} }`;
    }

}

export { Operant };

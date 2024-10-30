import { Token } from "./Token";

class Operant extends Token {
    public constructor(symbol: string) {
        super(symbol);
    }

    public override toString(): string {
        return `Operant: { ${super.toString()} }`;
    }
}

export { Operant };

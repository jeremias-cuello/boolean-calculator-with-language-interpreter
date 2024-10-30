import { Token } from "./Token";

class Operating extends Token{
    public constructor(symbol:string){
        super(symbol);
    }

    public override toString() : string {
        return `Operating: { ${super.toString()} }`;
    }
}

export { Operating };

class Token {

    private symbol : string = '';

    public constructor(symbol: string){
        this.Symbol = symbol;
    }

    public set Symbol(v : string){
        if(v.length == 1){
            this.symbol = v;
        }
        else{
            throw new Error("Token invalido");
        }
    }

    public get Symbol() : string {
        return this.symbol;
    }

    public toString() : string {
        return `Token: {symbol: ${this.symbol}}`;
    }
}

export { Token };

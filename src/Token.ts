abstract class Token {

    protected _symbol: string = '';

    public abstract set symbol(v: string);
    public abstract get symbol(): string;

    public toString(): string {
        return `Token: {symbol: ${this._symbol}}`;
    }
}

export { Token };

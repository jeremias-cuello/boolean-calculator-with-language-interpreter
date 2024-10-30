class Interpreter{

    private expression : string = "";

    public constructor(expression: string) {
        this.Expression = expression;
    }

    /**
     * @description saca los espacios
     */
    public set Expression(v : string) {
        this.expression = v.replace(/\s+/g, "");
    }

    public get Expression() : string {
        return this.expression;
    }
}

export { Interpreter };

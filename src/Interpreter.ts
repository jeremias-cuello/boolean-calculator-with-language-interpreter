class InterpreterSingleton{

    private static instance : InterpreterSingleton;
    private expression : string = "";

    private constructor(expression : string) {
        this.Expression = expression;
    }

    public static getInstancia(expression: string) : InterpreterSingleton {

        console.log("Antes");
        console.log("Interpreter.instance", InterpreterSingleton.instance);

        if(InterpreterSingleton.instance == null){
            InterpreterSingleton.instance = new InterpreterSingleton(expression);
            console.log('se hace por primera vez');
        }
        console.log("Despues");
        console.log("Interpreter.instance", InterpreterSingleton.instance);

        return InterpreterSingleton.instance;
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

export { InterpreterSingleton as Interpreter };

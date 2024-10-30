import { Operant } from "./Operant";
import { Operator } from "./Operator";
import { Token } from "./Token";

class InterpreterSingleton{

    private static instance : InterpreterSingleton;
    private expression : string = "";
    private tokens : Token[] = [];

    private constructor(expression : string) {
        this.Expression = expression;
    }

    public static getInstancia(expression: string) : InterpreterSingleton {

        if(InterpreterSingleton.instance == null){
            InterpreterSingleton.instance = new InterpreterSingleton(expression);
        }

        return InterpreterSingleton.instance;
    }

    public tokenization() : Token[]{
        let tokens : Token[] = [];

        // aux
        const print = (b:Boolean) => b ? 'operando' : 'operador';

        for (const token of this.tokens) {
            console.log(print(token instanceof Operant), token.toString());
        }

        return tokens;
    }

    public addToken(t : Token) : void {
        this.tokens.push(t);
    }

    //#region set and get Expression
    /**
     * @description remove spaces
     */
    public set Expression(v : string) {
        this.expression = v.replace(/\s+/g, "");
    }

    public get Expression() : string {
        return this.expression;
    }
    //#endregion
}

export { InterpreterSingleton as Interpreter };

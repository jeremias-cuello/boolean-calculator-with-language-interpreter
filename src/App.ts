import { Interpreter } from './Interpreter';

class App {
    public static main() : void {
        const expression: string = "D . ^ \t\r\n(A + B) ";
        const interpreter = new Interpreter(expression);
        console.log(interpreter.Expression);
    }
}

App.main();

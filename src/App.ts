import { Interpreter } from './Interpreter';

class App {
    public static main() : void {
        const expression: string = "D . ^ \t\r\n(A + B) ";
        const interpreter = Interpreter.getInstancia(expression);
        const otroInterprete = Interpreter.getInstancia(expression);
        console.log(interpreter.Expression);
        console.log(otroInterprete.Expression);
    }
}

App.main();

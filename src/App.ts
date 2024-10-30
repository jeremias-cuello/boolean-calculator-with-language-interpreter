import { Interpreter } from './Interpreter';
import { Operating } from './Operating';
import { Operator } from './Operator';

class App {
    public static main() : void {
        const expression: string = "D . ^ \t\r\n(A + B) ";
        const interpreter = Interpreter.getInstancia(expression);

        const disjunction = new Operator('+', 2, 1);
        const conjunction = new Operator('.', 2, 1);
        const negation = new Operator('~', 1, 2);

        const varA = new Operating('A');
        const varB = new Operating('B');
        const varC = new Operating('C');
        const varD = new Operating('D');

        // adding operators
        interpreter.addToken(disjunction);
        interpreter.addToken(conjunction);
        interpreter.addToken(negation);

        // adding operands
        interpreter.addToken(varA);
        interpreter.addToken(varB);
        interpreter.addToken(varC);
        interpreter.addToken(varD);

        interpreter.tokenization();
    }
}

App.main();

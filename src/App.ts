import { Interpreter } from './Interpreter';
import { Operant } from './Operant';
import { ConjunctionOperator } from './ConjunctionOperador';
import { DisyunctionOperator } from './DisyunctionOperator';
import { NegationOperator } from './NegationOperator';
import { GrouperEnd } from './GrouperEnd';
import { GrouperStart } from './GrouperStart';

class App {
    public static main(): void {

        const interpreter = Interpreter.getInstancia();

        const disjunction = new DisyunctionOperator('+', 2, 1);
        const conjunction = new ConjunctionOperator('.', 2, 2);
        const negation = new NegationOperator('~', 1, 3);

        const varA = new Operant('A', false);
        const varB = new Operant('B', true);
        const varC = new Operant('C', false);
        const varD = new Operant('D', true);

        const parenthesisStart = new GrouperStart('(');
        const parenthesisEnd = new GrouperEnd(')');

        // adding operators
        interpreter.addToken(disjunction);
        interpreter.addToken(conjunction);
        interpreter.addToken(negation);

        // adding operands
        interpreter.addToken(varA);
        interpreter.addToken(varB);
        interpreter.addToken(varC);
        interpreter.addToken(varD);

        // adding grouper
        interpreter.addToken(parenthesisStart);
        interpreter.addToken(parenthesisEnd);

        // use
        const expression: string = "D . ~ \t\r\n(A + B) + C + C";
        interpreter.Expression = expression;
        interpreter.validate();
    }
}

App.main();

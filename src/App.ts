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
        // A + B . C + D <equivalente> A + ( B . C ) + D porque . tiene mayor prioridad que +
        // const expression: string = "A + B . C + D . A + B . D . A . C + A";
                             //    "A +   1   + D . A + B . D . A . C + A";
                             //    "   2      + D . A + B . D . A . C + A";
                             //    "   2      +   3   + B . D . A . C + A";
                             //    "          4       + B . D . A . C + A"; // vacia la pila de operadores
                             //    "          4       +   5   . A . C + A";
                             //    "          4       +     6     . C + A";
                             //    "          4       +        7      + A";

        const expression: string = "A + B . C ~ D . A + C";
        interpreter.Expression = expression;
        interpreter.tokenization();
        interpreter.parse();
    }
}

App.main();

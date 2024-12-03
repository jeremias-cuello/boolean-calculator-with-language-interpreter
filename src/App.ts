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
        const expression: string = "A + B . C + D . A + B . D . A . C + A . C . ~ D . A . B . C . ~ D";
        //    "A + B . C + D . A + B . D . A . C + A . C . ~ D . A . B . C . ~ D";
        //    "A +   1   + D . A + B . D . A . C + A . C . ~ D . A . B . C . ~ D";
        //    "  2       + D . A + B . D . A . C + A . C . ~ D . A . B . C . ~ D";
        //    "  2       +   3   + B . D . A . C + A . C . ~ D . A . B . C . ~ D";
        //    "          4       + B . D . A . C + A . C . ~ D . A . B . C . ~ D"; // vacia la pila de operadores
        //    "          4       +   5   . A . C + A . C . ~ D . A . B . C . ~ D";
        //    "          4       +       6   . C + A . C . ~ D . A . B . C . ~ D";
        //    "          4       +           7   + A . C . ~ D . A . B . C . ~ D";
        //    "                  8               + A . C . ~ D . A . B . C . ~ D";
        //    "                  8               +   9   . ~ D . A . B . C . ~ D";
        //    "                  8               +   9   . 10  . A . B . C . ~ D";
        //    "                  8               +       11    . A . B . C . ~ D";
        //    "                  8               +             12  . B . C . ~ D";
        //    "                  8               +                 13  . C . ~ D";
        //    "                  8               +                     14  . ~ D";
        //    ----------------  Execute  ----------------
        //    "                  8               +                    14   .  15";
        //    "                  8               +                         16   ";
        //    "                                  17                             ";

        // const expression: string = "A + B . C . ~ D . A + C";
        //    "A + B . C . ~ D . A + C"
        //    "A +   1   . ~ D . A + C"
        //    "A +   1   .  2  . A + C"
        //    "A +       3     . A + C"
        //    "A +             4   + C"
        //    "  5                 + C"

        // const expression: string = "A + B";
        console.log("expression: ", expression);

        interpreter.Expression = expression;
        interpreter.tokenize();
        interpreter.parse();
        const result: boolean = interpreter.execute();

        console.log(`Result = ${result}`);
    }
}

App.main();

import React, { useState, useMemo } from 'react';
import './calculator.css';
import { evaluate } from 'mathjs';

const Calculator = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const appendValue = (value) => {
        setInput((prevInput) => prevInput + value);
    };
    
    const clearInput = () => {
        setInput('');
        setOutput('');
    };

    const evaluateExpression = (expression) => {
        try {
            const result = evaluate(expression);
            if (result === Infinity) return 'Infinity';
            if (Number.isNaN(result)) return 'NaN';
            return result;
        } catch (error) {
            return 'Error';
        }
    };

    const memoizedResult = useMemo(() => evaluateExpression(input), [input]);

    const calculateResult = () => {
        if (memoizedResult === undefined || memoizedResult === 'Error') {
            setOutput('Invalid Expression');
        } else {
            setOutput(memoizedResult.toString());
        }
    };

    return (
        <div className="calculator">
            <div>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <div className="result">
                    {output}
                </div>
            </div>
            <div className="buttons">
                {['7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3', '*', '0', 'C', '=', '/'].map((button) => (
                    <button
                        key={button}
                        onClick={() =>
                            button === '='
                                ? calculateResult()
                                : button === 'C'
                                ? clearInput()
                                : appendValue(button)}>
                        {button}
                     </button>
                ))}
            </div>
        </div>
    );
};

export default Calculator;






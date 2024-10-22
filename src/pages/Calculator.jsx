import React, { useState } from 'react';
import '../Calculator.css'; // สำหรับการจัดการ UI

function Calculator() {
  const [input, setInput] = useState('0');
  const [result, setResult] = useState('');
  const [lastOperation, setLastOperation] = useState(null);
  const [lastValue, setLastValue] = useState(null);

  const handleButtonClick = (value) => {
    if (value === 'C') {
      setInput('0');
      setResult('');
      setLastOperation(null);
      setLastValue(null);
    } else if (value === '+/-') {
      setInput((prev) => (prev[0] === '-' ? prev.slice(1) : '-' + prev));
    } else if (value === '%') {
      setInput((prev) => (parseFloat(prev) / 100).toString());
    } else if (value === '.') {
      if (!input.includes('.')) setInput((prev) => prev + value);
    } else if (['+', '-', 'x', '/'].includes(value)) {
      setLastOperation(value);
      setLastValue(input);
      setResult(input);
      setInput('');
    } else if (value === '=') {
      if (lastOperation && result) {
        let calculation;
        switch (lastOperation) {
          case '+':
            calculation = parseFloat(result) + parseFloat(input || lastValue);
            break;
          case '-':
            calculation = parseFloat(result) - parseFloat(input || lastValue);
            break;
          case 'x':
            calculation = parseFloat(result) * parseFloat(input || lastValue);
            break;
          case '/':
            calculation = parseFloat(result) / parseFloat(input || lastValue);
            break;
          default:
            break;
        }
        setInput(parseFloat(calculation.toFixed(4)).toString());
        setResult(input || lastValue);
        setLastValue(input || lastValue);
      }
    } else {
      setInput((prev) => (prev === '0' ? value : prev + value));
    }
  };

  return (
    <div className='CC'>
      <header className="header">
          <h1>Calculator</h1>
        </header>
      <div className="calculator">
        <div className="display">{input}</div>
        <div className="buttons">
          {['C', '+/-', '%', '/'].map((symbol) => (
            <button key={symbol} onClick={() => handleButtonClick(symbol)} className={['C', '+/-', '%'].includes(symbol) ? 'gray' : 'orange'}>
              {symbol}
            </button>
          ))}
          {['7', '8', '9', 'x'].map((symbol) => (
            <button key={symbol} onClick={() => handleButtonClick(symbol)} className="gray">
              {symbol}
            </button>
          ))}
          {['4', '5', '6', '-'].map((symbol) => (
            <button key={symbol} onClick={() => handleButtonClick(symbol)} className="gray">
              {symbol}
            </button>
          ))}
          {['1', '2', '3', '+'].map((symbol) => (
            <button key={symbol} onClick={() => handleButtonClick(symbol)} className="gray">
              {symbol}
            </button>
          ))}
          {['0', '.', '='].map((symbol) => (
            <button key={symbol} onClick={() => handleButtonClick(symbol)} className={symbol === '0' ? 'zero gray' : symbol === '=' ? 'orange' : 'gray'}>
              {symbol}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calculator;
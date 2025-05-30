import { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [numberInput, setNumberInput] = useState('');
  const [numberTrivia, setNumberTrivia] = useState('');
  const [numberError, setNumberError] = useState('');

  const [dateInput, setDateInput] = useState('');
  const [dateTrivia, setDateTrivia] = useState('');
  const [dateError, setDateError] = useState('');

  const [mathInput, setMathInput] = useState('');
  const [mathTrivia, setMathTrivia] = useState('');
  const [mathError, setMathError] = useState('');

  // Number Trivia
  useEffect(() => {
    const trimmed = numberInput.trim();
    if (trimmed === '') {
      setNumberTrivia('');
      setNumberError('');
      return;
    }

    if (!/^-?\d+$/.test(trimmed)) {
      setNumberError('Please enter a valid number');
      setNumberTrivia('');
      return;
    }

    fetch(`http://numbersapi.com/${trimmed}`)  
      .then(res => res.text())
      .then(text => {
        setNumberTrivia(text);
        setNumberError('');
      })
      .catch(() => {
        setNumberError('Failed to fetch number trivia');
        setNumberTrivia('');
      });
  }, [numberInput]);

  //  Date Trivia
  useEffect(() => {
    const trimmed = dateInput.trim();
    if (trimmed === '') {
      setDateTrivia('');
      setDateError('');
      return;
    }

    const parts = trimmed.includes('-') ? trimmed.split('-') : [];
    let month, day;

    if (parts.length === 2) {
      [month, day] = parts;
    } else if (parts.length === 3) {
      [, month, day] = parts;
    }

    if (!month || !day || isNaN(month) || isNaN(day) || +month < 1 || +month > 12 || +day < 1 || +day > 31) {
      setDateError('Enter valid date in MM-DD or YYYY-MM-DD format');
      setDateTrivia('');
      return;
    }

    fetch(`http://numbersapi.com/${+month}/${+day}/date`)  
      .then(res => res.text())
      .then(text => {
        setDateTrivia(text);
        setDateError('');
      })
      .catch(() => {
        setDateError('Failed to fetch date trivia');
        setDateTrivia('');
      });
  }, [dateInput]);

  // Math Trivia
  useEffect(() => {
    const trimmed = mathInput.trim();
    if (trimmed === '') {
      setMathTrivia('');
      setMathError('');
      return;
    }

    if (!/^-?\d+$/.test(trimmed)) {
      setMathError('Please enter a valid number');
      setMathTrivia('');
      return;
    }

    fetch(`http://numbersapi.com/${trimmed}/math`)  
      .then(res => res.text())
      .then(text => {
        setMathTrivia(text);
        setMathError('');
      })
      .catch(() => {
        setMathError('Failed to fetch math trivia');
        setMathTrivia('');
      });
  }, [mathInput]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100 text-gray-800">
      <h1 className="text-2xl font-bold mb-4">🎲 Fun Facts about the Numbers and Dates</h1>

      <div className="w-full max-w-md space-y-6">
        {/* Number Input */}
        <div>
          <label className="block font-medium">Number Trivia</label>
          <input
            type="text"
            value={numberInput}
            onChange={e => setNumberInput(e.target.value)}
            placeholder="Enter a number"
            className="w-full p-2 border rounded"
          />
          {numberError && <p className="text-red-600 text-sm">{numberError}</p>}
          {numberTrivia && <p className="mt-2 text-green-700">{numberTrivia}</p>}
        </div>

        {/* Date Input */}
        <div>
          <label className="block font-medium">Date Trivia (MM-DD or YYYY-MM-DD)</label>
          <input
            type="text"
            value={dateInput}
            onChange={e => setDateInput(e.target.value)}
            placeholder="Enter a date"
            className="w-full p-2 border rounded"
          />
          {dateError && <p className="text-red-600 text-sm">{dateError}</p>}
          {dateTrivia && <p className="mt-2 text-green-700">{dateTrivia}</p>}
        </div>

        {/* Math Input */}
        <div>
          <label className="block font-medium">Math Trivia (Number)</label>
          <input
            type="text"
            value={mathInput}
            onChange={e => setMathInput(e.target.value)}
            placeholder="Enter a number"
            className="w-full p-2 border rounded"
          />
          {mathError && <p className="text-red-600 text-sm">{mathError}</p>}
          {mathTrivia && <p className="mt-2 text-green-700">{mathTrivia}</p>}
        </div>
      </div>
    </div>
  );
};

export default App;

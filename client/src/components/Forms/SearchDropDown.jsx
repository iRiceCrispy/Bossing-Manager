import React, { useState } from 'react';
import './SearchDropDown.css';

const SearchDropDown = ({ options, result, setResult, disabled, reset }) => {
  const [input, setInput] = useState('');
  const matches = options?.filter(option => option.toLowerCase().includes(input.toLowerCase()));

  if (reset) {
    setResult('');
  }

  const setValue = match => {
    setInput('');
    setResult(match);
  };

  return (
    <div className='sddContainer'>
      <input
        className='search'
        type='text'
        value={input || result}
        disabled={disabled}
        onChange={e => {
          setInput(e.target.value);
          setResult('');
        }}
      />
      {input && (
      <div className='matches'>
        {matches.map(match => (
          <div className='match' onClick={() => setValue(match)}>{match}</div>
        ))}
      </div>
      )}
    </div>
  );
};

export default SearchDropDown;

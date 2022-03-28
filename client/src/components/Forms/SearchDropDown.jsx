import React, { useState } from 'react';
import DropDownMenu from './DropDownMenu';
import './SearchDropDown.css';

const SearchDropDown = ({ options, result, setResult, disabled }) => {
  const [input, setInput] = useState('');
  const matches = options?.filter(option => option.toLowerCase().includes(input.toLowerCase()));

  if (disabled) {
    if (input) setInput('');
    if (result) setResult('');
  }

  const setValue = match => {
    setInput('');
    setResult(match);
  };

  return (
    <div className={`sddContainer${disabled ? ' disabled' : ''}`}>
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
        <DropDownMenu matches={matches} setter={setValue} />
      )}
    </div>
  );
};

export default SearchDropDown;

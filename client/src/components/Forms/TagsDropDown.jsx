import React, { useState } from 'react';
import Tags from './Tags';
import DropDownMenu from './DropDownMenu';

const TagsDropDown = ({ options, results, setResult }) => {
  const [input, setInput] = useState('');

  console.log(options);
  console.log(results);

  const matches = options
    ?.filter(option => option.value.toLowerCase().includes(input.toLowerCase())
    && !results?.some(result => result.value === option.value))
    .sort((a, b) => a.value.localeCompare(b.value));

  const setter = match => {
    setInput('');
    setResult(prev => [...new Set([...prev, match])]
      .sort((a, b) => a.value.localeCompare(b.value)));
  };

  return (
    <div className='tddContainer'>
      {results?.map(result => (
        <Tags key={result.id} tag={result.value} setter={setResult} />
      ))}
      <input
        className='search'
        type='text'
        value={input}
        onChange={e => {
          setInput(e.target.value);
        }}
      />
      {input && (
        <DropDownMenu matches={matches} setter={setter} />
      )}
    </div>
  );
};

export default TagsDropDown;

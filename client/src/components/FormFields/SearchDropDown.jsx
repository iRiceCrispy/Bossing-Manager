import React, { useState, useEffect } from 'react';
import DropDownMenu from './DropDownMenu';
import './SearchDropDown.css';

const SearchDropDown = ({ options, result, setResult, index }) => {
  const [input, setInput] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const matches = options
    ?.filter(option => option.value.toLowerCase().includes(input.toLowerCase()));

  // if (disabled) {
  //   if (input) setInput('');
  //   if (result) setResult('');
  // }

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const setValue = match => {
    setInput('');
    setResult(match.id);
  };

  // useEffect(() => {
  //   const height = document.querySelector('.search.dropdown').offsetHeight;
  //   document.querySelector('.dropdownContainer').style.height = height;
  // }, []);

  return (
    <div
      className={`searchDropdownContainer${showMenu ? ' showMenu' : ''}`}
      onClick={e => {
        e.stopPropagation();
        setShowMenu(true);
      }}
    >
      <div className='searchDropdown' style={{ zIndex: index }}>
        <div className='result'>
          <input
            className='search'
            type='text'
            value={input || result || ''}
            onChange={e => {
              setInput(e.target.value);
              setResult('');
            }}
          />
        </div>
        {showMenu && (
          <DropDownMenu matches={matches} setter={setValue} setShowMenu={setShowMenu} />
        )}
      </div>
    </div>
  );
};

export default SearchDropDown;

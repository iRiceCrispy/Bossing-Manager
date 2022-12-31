import React from 'react';
import './DropdownMenu.scss';

const DropDown = ({ options, nullText = 'No options', onClick }) => (
  <div className="dropdownMenu">
    <ul className="options">
      {options?.length
        ? options.map(option => (
          <li
            className="option"
            key={option.id}
            role="menuitem"
            tabIndex={0}
            onClick={() => onClick(option)}
          >
            {option.value}
          </li>
        ))
        : <div className="noResults">{nullText}</div>}
    </ul>
  </div>
);

export default DropDown;

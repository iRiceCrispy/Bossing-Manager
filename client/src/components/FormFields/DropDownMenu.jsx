import React from 'react';
import './DropDownMenu.scss';

const DropDown = ({ options, nullText = 'No options', onClick }) => (
  <ul className="dropdownMenu">
    {options?.length
      ? options.map(option => (
        <li
          className="dropdownOption"
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
);

export default DropDown;

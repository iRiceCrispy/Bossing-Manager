import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DropdownMenu from './DropdownMenu';
import './Autocomplete.scss';

const Autocomplete = ({ multiple, id, label, placeholder, options, defaultTags = [], defaultValue = '', setResult }) => {
  const [tags, setTags] = useState(defaultTags);
  const [input, setInput] = useState(defaultValue);
  const [showMenu, setShowMenu] = useState(false);
  const ref = useRef(null);

  const matches = options
    ?.filter(option => option.value.toLowerCase().includes(input.toLowerCase())
    && !tags?.map(tag => tag.value).includes(option.value))
    .sort((a, b) => a.value.localeCompare(b.value));

  useEffect(() => {
    const closeMenu = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, []);

  useEffect(() => {
    if (multiple) setResult(tags);
  }, [tags, setResult, multiple]);

  const updateInput = (e) => {
    setInput(e.target.value);
    setResult(null);
    setShowMenu(true);
  };

  const updateResult = (option) => {
    setInput(option.value);
    setResult(option.id);
    setShowMenu(false);
  };

  const addTag = (option) => {
    setInput('');
    setTags(prev => [...prev, option].sort((a, b) => a.value.localeCompare(b.value)));
  };

  const removeTag = (option) => {
    setTags(prev => prev.filter(tag => tag.value !== option.value));
  };

  return (
    <div
      className={`autocomplete${multiple ? ' multiple' : ''}`}
      ref={ref}
    >
      <label htmlFor={id}>{label}</label>
      <div className="searchContainer">
        {multiple && (
          <>
            {tags.map(tag => (
              <div key={tag.id} className="tag">
                <span className="value">{tag.value}</span>
                <span
                  className="x"
                  role="button"
                  tabIndex={0}
                  onClick={() => removeTag(tag)}
                >
                  <FontAwesomeIcon icon="fas fa-xmark" />
                </span>
              </div>
            ))}
          </>
        )}
        <input
          className="searchbar"
          id={id}
          placeholder={placeholder}
          value={input}
          onClick={() => setShowMenu(!showMenu)}
          onChange={updateInput}
        />
        {showMenu && (
        <DropdownMenu options={matches} onClick={multiple ? addTag : updateResult} />
        )}
      </div>
    </div>
  );
};

export default Autocomplete;

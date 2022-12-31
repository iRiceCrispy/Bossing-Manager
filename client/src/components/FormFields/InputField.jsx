import React from 'react';
import './InputField.scss';

const InputField = ({ id, label, type = 'text', placeholder, value, onChange }) => (
  <div className="inputField">
    <label htmlFor={id}>{label}</label>
    <div className="inputContainer">
      <input
        className="input"
        id={id}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  </div>
);

export default InputField;

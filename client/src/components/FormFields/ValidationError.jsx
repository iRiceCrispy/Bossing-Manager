import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ValidationError.css';

const ValidationError = ({ message }) => (
  <p className="validationError">
    {message && (
      <>
        <FontAwesomeIcon className="errorIcon" icon="fa-solid fa-circle-exclamation" />
        <span>{message}</span>
      </>
    )}
  </p>
);

ValidationError.propTypes = {
  message: PropTypes.string,
};

ValidationError.defaultProps = {
  message: undefined,
};

export default ValidationError;

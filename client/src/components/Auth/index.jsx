import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoginForm from '../Forms/LoginForm';
import SignupForm from '../Forms/SignupForm';
import loginImg from '../../assets/login.png';
import signupImg from '../../assets/signup.png';

import './Auth.scss';

const Auth = ({ type }) => (
  <div id="auth" className={`${type}`}>
    <Link className="btn transparent home" to="/">Home</Link>
    <img
      className={`authImage ${type}`}
      src={type === 'login' ? loginImg : signupImg}
      alt={type}
    />
    <div className="formContainer">
      {type === 'login' ? <LoginForm /> : <SignupForm />}
    </div>
  </div>
);

Auth.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Auth;

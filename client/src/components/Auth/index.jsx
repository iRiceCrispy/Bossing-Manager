import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import './Auth.css';

const Login = ({ type }) => (
  <div className={`auth content ${type}`}>
    <Link className='btn transparent home' to='/'>Home</Link>
    <img className={`authImage ${type}`} src={`/static/${type}.png`} alt={type} />
    <div className='formContainer'>
      {type === 'login' ? <LoginForm /> : <SignupForm />}
    </div>
  </div>
);

export default Login;

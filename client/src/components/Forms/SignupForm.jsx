import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ValidationError from '../FormFields/ValidationError';
import { signup } from '../../store/session';

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    dispatch(signup({ email, username, password, confirmPassword }))
      .unwrap()
      .then(() => {
        navigate('/dashboard');
      })
      .catch((err) => {
        setErrors(err);
      });
  };

  return (
    <form id="signupForm" className="form" onSubmit={handleSubmit}>
      <header><h2>Sign Up</h2></header>
      <div className="content">
        <label>
          Email
          <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
          <ValidationError message={errors.email} />
        </label>
        <label>
          Username
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
          <ValidationError message={errors.username} />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <ValidationError message={errors.password} />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <ValidationError message={errors.confirmPassword} />
        </label>
      </div>
      <footer>
        <div className="buttons">
          <button className="btn light" type="submit">Sign Up</button>
        </div>
        <p>
          Already registered?
          {' '}
          <Link to="/login">Log in here</Link>
        </p>
      </footer>
    </form>
  );
};

export default SignupForm;

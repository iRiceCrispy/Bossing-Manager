import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import InputField from '../FormFields/InputField';
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
        if (err === 'Form error') {
          alert('Something went wrong when submitting the form. Please try again.');
          window.location.reload();
        }
        else {
          setErrors(err);
        }
      });
  };

  return (
    <form id="signupForm" className="form" onSubmit={handleSubmit}>
      <header><h2>Sign Up</h2></header>
      <main>
        <div className="formField email">
          <InputField
            id="email"
            label="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <ValidationError message={errors.email} />
        </div>
        <div className="formField username">
          <InputField
            id="username"
            label="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <ValidationError message={errors.username} />
        </div>
        <div className="formField password">
          <InputField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <ValidationError message={errors.password} />
        </div>
        <div className="formField confirmPassword">
          <InputField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <ValidationError message={errors.confirmPassword} />
        </div>
      </main>
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

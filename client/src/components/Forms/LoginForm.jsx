import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ValidationError from '../FormFields/ValidationError';
import { demo, login } from '../../store/session';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    dispatch(login({ credential, password }))
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

  const demoLogin = () => {
    dispatch(demo())
      .unwrap()
      .then(() => {
        navigate('/dashboard');
      })
      .catch(() => {
        alert('Something went wrong when submitting the form. Please try again.');
        window.location.reload();
      });
  };

  return (
    <form id="loginForm" className="form" onSubmit={handleSubmit}>
      <header><h2>Log In</h2></header>
      <div className="content">
        <div className="loginError">
          <ValidationError message={errors.login} />
        </div>
        <label>
          Username/Email
          <input
            type="text"
            value={credential}
            onChange={e => setCredential(e.target.value)}
          />
          <ValidationError message={errors.credential} />
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
      </div>
      <footer>
        <div className="buttons">
          <button className="btn dark" type="submit">Log In</button>
          <button className="btn dark" type="button" onClick={demoLogin}>Log In as Demo</button>
        </div>
        <p>
          Not registered?
          {' '}
          <Link to="/signup">Create an account</Link>
        </p>
      </footer>
    </form>
  );
};

export default LoginForm;

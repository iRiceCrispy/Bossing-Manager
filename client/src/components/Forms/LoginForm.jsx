import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ValidationError from '../FormFields/ValidationError';
import { demo, login } from '../../store/session';

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to='/' />;

  const handleSubmit = e => {
    e.preventDefault();
    setErrors({});

    return dispatch(login({ credential, password }))
      .then(() => {
        history.replace('/dashboard');
      })
      .catch(async res => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  const demoLogin = () => {
    dispatch(demo()).then(() => {
      history.replace('/dashboard');
    });
  };

  return (
    <form id='loginForm' className='form' onSubmit={handleSubmit}>
      <header><h2>Log In</h2></header>
      <div className='content'>
        <div className='loginError'>
          <ValidationError message={errors.login} />
        </div>
        <label>
          Username/Email
          <input
            type='text'
            value={credential}
            onChange={e => setCredential(e.target.value)}
          />
          <ValidationError message={errors.credential} />
        </label>
        <label>
          Password
          <input
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <ValidationError message={errors.password} />
        </label>
      </div>
      <footer>
        <div className='buttons'>
          <button className='btn dark' type='submit'>Log In</button>
          <button className='btn dark' type='button' onClick={demoLogin}>Log In as Demo</button>
        </div>
        <p>
          Not registered?
          {' '}
          <Link to='/signup'>Create an account</Link>
        </p>
      </footer>
    </form>
  );
};

export default LoginForm;

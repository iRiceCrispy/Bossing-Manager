import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { demo, login } from '../../store/session';

const LoginForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to='/' />;

  const handleSubmit = e => {
    e.preventDefault();

    return dispatch(login({ credential, password })).catch(async res => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
      else setErrors([]);
    });
  };

  return (
    <form className='loginForm' onSubmit={handleSubmit}>
      <header><h2>Log In</h2></header>
      <ul className='errors'>
        {errors.map((error, idx) => (
          <li className='error' key={idx}>{error}</li>
        ))}
      </ul>
      <div className='form content'>
        <label>
          Username/Email
          <input
            type='text'
            value={credential}
            onChange={e => setCredential(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
      </div>
      <footer>
        <div className='buttons'>
          <button className='btn filled' type='submit'>Log In</button>
          <button className='btn filled' type='button' onClick={() => dispatch(demo())}>Log In as Demo</button>
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

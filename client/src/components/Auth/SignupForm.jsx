import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../store/session';

const SignupForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to='/' />;

  const handleSubmit = e => {
    e.preventDefault();
    setErrors([]);

    return dispatch(signup({ email, username, password, confirmPassword })).catch(async res => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  return (
    <form className='signupForm' onSubmit={handleSubmit}>
      <header><h2>Sign Up</h2></header>
      <ul className='errors'>
        {errors.map((error, idx) => (
          <li className='error' key={idx}>{error}</li>
        ))}
      </ul>
      <div className='form content'>
        <label>
          Email
          <input type='text' value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          Username
          <input type='text' value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Password
          <input
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <label>
          Confirm Password
          <input
            type='password'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </label>
      </div>
      <footer>
        <div className='buttons'>
          <button className='btn filled' type='submit'>Sign Up</button>
        </div>
        <p>
          Already registered?
          {' '}
          <Link to='/login'>Log in here</Link>
        </p>
      </footer>
    </form>
  );
};

export default SignupForm;

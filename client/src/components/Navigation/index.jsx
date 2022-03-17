import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

const Navigation = () => {
  const user = useSelector(state => state.session.user);

  return (
    <nav>
      <div className='navbar'>
        <div className='home'>
          <Link className='btn transparent' to='/'>Home</Link>
        </div>
        <div className='auth'>
          {user ? (
            <ProfileButton user={user} />
          ) : (
            <>
              <Link className='btn transparent' to='/login'>Log In</Link>
              <Link className='btn transparent' to='/signup'>Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

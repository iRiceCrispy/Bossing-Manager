import React from 'react';
import { Link } from 'react-router-dom';
import './Splash.css';

const Splash = () => (
  <div className='splash'>
    <header>
      <div className='header'>
        <div className='home'>
          <Link className='btn transparent' to='/'>Home</Link>
        </div>
        <h1>A Maplestory boss drop tracker</h1>
        <div className='authButtons'>
          <Link className='btn transparent' to='/login'>Log In</Link>
          <Link className='btn transparent' to='/signup'>Sign Up</Link>
        </div>
      </div>
    </header>
    <section className='main'>
      <div className='content'>
        <h2>
          Manage your
          <br />
          hard earned boss drops!
        </h2>
        <Link className='btn filled large' to='/signup'>Get started!</Link>
      </div>
    </section>
  </div>
);

export default Splash;

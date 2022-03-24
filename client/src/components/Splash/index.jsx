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
    <footer>
      <div className='tech'>
        <p className='heading'>Technologies Used</p>
        <div>
          <div className='backend'>
            <p className='heading2'>Backend</p>
            <div>
              <p>Express</p>
              <p>MongoDB</p>
            </div>
          </div>
          <div className='frontend'>
            <p className='heading2'>Frontend</p>
            <div>
              <p>React</p>
              <p>Redux</p>
            </div>
          </div>
        </div>
      </div>
      <div className='about'>
        <p className='heading'>About Me</p>
        <div>
          <a href='https://github.com/iRiceCrispy' target='_blank' rel='noreferrer'>Github</a>
          <a href='https://www.linkedin.com/in/erichuang-97/' target='_blank' rel='noreferrer'>LinkedIn</a>
        </div>
      </div>
    </footer>
  </div>
);

export default Splash;

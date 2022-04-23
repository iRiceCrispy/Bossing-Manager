import React from 'react';
import { Link } from 'react-router-dom';
import blackmage from '../../assets/Black_Mage.png';
import './Splash.css';

const Splash = () => (
  <div className='splash'>
    <header>
      <div className='header'>
        <div className='home'>
          <Link className='btn transparent' to='/'>
            <img src='favicon.ico' alt='favicon' />
            Chaos Mano
          </Link>
        </div>
        <h1>A Maplestory boss drop tracker</h1>
        <div className='authButtons'>
          <Link className='btn transparent' to='/login'>Log In</Link>
          <Link className='btn transparent' to='/signup'>Sign Up</Link>
        </div>
      </div>
    </header>
    <section className='main' style={{ backgroundImage: `url(${blackmage})` }}>
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
          <div className='frontend'>
            <p className='heading2'>Frontend</p>
            <div>
              <p>HTML</p>
              <p>CSS</p>
              <p>JavaScript</p>
              <p>React</p>
              <p>Redux</p>
            </div>
          </div>
          <div className='backend'>
            <p className='heading2'>Backend</p>
            <div>
              <p>JavaScript</p>
              <p>Express</p>
              <p>MongoDB</p>
              <p>Mongoose</p>
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

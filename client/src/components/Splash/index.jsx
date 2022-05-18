import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getSessionUser } from '../../store/session';
import ProfileButton from '../ProfileButton';
import blackmage from '../../assets/Black_Mage.png';
import './Splash.scss';

const Splash = () => {
  const sessionUser = useSelector(getSessionUser);

  return (
    <div id="splash">
      <nav>
        <div className="navbar">
          <div className="home">
            <Link className="logo" type="button" to="/">
              <img src="/favicon.ico" alt="favicon" />
              <span className="text">Chaos Mano</span>
            </Link>
          </div>
          <div className="authButtons">
            {sessionUser ? (
              <>
                <Link className="btn transparent dashboard" to="/dashboard">Dashboard</Link>
                <ProfileButton user={sessionUser} />
              </>
            ) : (
              <>
                <Link className="btn transparent" to="/login">Log In</Link>
                <Link className="btn transparent" to="/signup">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <header style={{ backgroundImage: `url(${blackmage})` }}>
        <h1 className="title">A Maplestory boss drop tracker</h1>
        <div className="content">
          <div className="description">
            <h2>
              Track and manage your hard earned boss drops!
            </h2>
            {sessionUser ? (
              <Link className="btn dark large" to="/signup">Go to Dashboard</Link>
            ) : (
              <Link className="btn dark large" to="/signup">Get started!</Link>
            )}
          </div>
        </div>
      </header>
      <footer>
        <div className="tech">
          <p className="heading">Technologies Used</p>
          <div>
            <div className="frontend">
              <p className="heading2">Frontend</p>
              <div>
                <p>HTML</p>
                <p>CSS</p>
                <p>JavaScript</p>
                <p>React</p>
                <p>Redux</p>
              </div>
            </div>
            <div className="backend">
              <p className="heading2">Backend</p>
              <div>
                <p>JavaScript</p>
                <p>Express</p>
                <p>MongoDB</p>
                <p>Mongoose</p>
              </div>
            </div>
          </div>
        </div>
        <div className="about">
          <p className="heading">About Me</p>
          <div>
            <a href="https://github.com/iRiceCrispy" target="_blank" rel="noreferrer">Github</a>
            <a href="https://www.linkedin.com/in/erichuang-97/" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Splash;

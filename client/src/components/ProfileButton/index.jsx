import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logout } from '../../store/session';
import './ProfileButton.scss';

const ProfileButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.session.user);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  return (
    <div className="profileContainer">
      <button
        className="btn transparent profileButton"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setShowMenu(prev => !prev);
        }}
      >
        <FontAwesomeIcon icon="fas fa-user" />
      </button>
      {showMenu && (
        <div
          className="profileMenu"
          role="menu"
          tabIndex={-1}
          onClick={e => e.stopPropagation()}
        >
          <p>
            Username:
            {' '}
            {user.username}
          </p>
          <p>
            Email:
            {' '}
            {user.email}
          </p>
          <button
            className="btn transparent logout"
            type="button"
            onClick={() => {
              dispatch(logout());
              navigate('/');
            }}
          >
            <span className="icon">
              <FontAwesomeIcon icon="fas fa-arrow-right-from-bracket" />
            </span>
            <span className="text">Log Out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;

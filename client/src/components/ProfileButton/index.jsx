import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logout } from '../../store/session';
import './ProfileButton.scss';

const ProfileButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();
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
        onClick={() => !showMenu && setShowMenu(true)}
      >
        <FontAwesomeIcon icon="fas fa-user" />
      </button>
      {showMenu && (
        <div
          className="profileMenu"
          role="button"
          tabIndex={0}
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
              history.push('/');
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

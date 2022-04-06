import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useSelected } from '../../context/SelectedContext';
import Modal from '../Modal';
import PartyForm from '../Forms/PartyForm';
import ProfileButton from './ProfileButton';
import './Navigation.css';

const Navigation = () => {
  const [showCreate, setShowCreate] = useState(false);
  const { setSelectedParty, setSelectedDrop } = useSelected();
  const user = useSelector(state => state.session.user);

  return (
    <nav>
      <div className='navbar'>
        <div className='home section'>
          <Link
            className='btn transparent'
            to='/'
            onClick={() => {
              setSelectedParty('');
              setSelectedDrop('');
            }}
          >
            Home
          </Link>
        </div>
        <div className='options section'>
          {showCreate ? (
            <Modal showModal={setShowCreate}>
              <PartyForm showForm={setShowCreate} />
            </Modal>
          ) : (
            <button className='btn transparent createParty navOption' type='button' onClick={() => setShowCreate(true)}>Create new party</button>
          )}
        </div>
        <div className='auth section'>
          {user ? (
            <ProfileButton user={user} />
          ) : (
            <>
              <Link className='btn transparent navOption' to='/login'>Log In</Link>
              <Link className='btn transparent navOption' to='/signup'>Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

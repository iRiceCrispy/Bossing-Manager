import React from 'react';
import './Modal.css';

const Modal = ({ children, setShowModal }) => (
  <div className='modalContainer' onClick={() => setShowModal(false)}>
    <div className='modal' onClick={e => e.stopPropagation()}>{children}</div>
  </div>
);

export default Modal;

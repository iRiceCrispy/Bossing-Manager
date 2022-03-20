import React from 'react';
import './Modal.css';

const Modal = ({ children, showModal }) => (
  <div className='modalContainer' onClick={() => showModal(false)}>
    <div className='modal' onClick={e => e.stopPropagation()}>{children}</div>
  </div>
);

export default Modal;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSale } from '../../store/drops';
import './forms.css';

const SaleForm = ({ drop, setShowForm }) => {
  const dispatch = useDispatch();
  const [price, setPrice] = useState('0');
  const [image, setImage] = useState('');

  const changePrice = e => {
    if (!e.target.value.match(/^(|[,\d])+$/)) return;

    setPrice(+(e.target.value).replace(/,/g, ''));
  };

  const submitForm = e => {
    e.preventDefault();

    const newSale = {
      price,
      saleImage: image,
    };

    dispatch(addSale(drop.id, newSale))
      .then(() => setShowForm(false));
  };

  return (
    <div className='formContainer saleForm'>
      <form onSubmit={submitForm}>
        <header>
          <h2 className='formTitle'>Input sales info.</h2>
        </header>
        <div className='formContent'>
          <label>
            Price
            <input
              type='text'
              value={price.toLocaleString()}
              onChange={changePrice}
              onFocus={() => price <= 0 && setPrice('')}
              onBlur={() => !price && setPrice('0')}
            />
          </label>
          <label>
            Image (optional)
            <input type='text' value={image} onChange={e => setImage(e.target.value)} />
          </label>
        </div>
        <footer>
          <button className='btn filled submit' type='submit'>Confirm</button>
        </footer>
      </form>
    </div>
  );
};
export default SaleForm;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import InputField from '../FormFields/InputField';
import ValidationError from '../FormFields/ValidationError';
import { addSale } from '../../store/drops';
import './forms.scss';

const SaleForm = ({ drop, setShowForm }) => {
  const dispatch = useDispatch();
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [errors, setErrors] = useState({});

  const changePrice = (e) => {
    if (!e.target.value.match(/^(|[,\d])+$/)) return;

    setPrice(e.target.value.replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ','));
  };

  const submitForm = (e) => {
    e.preventDefault();
    setErrors({});

    const newSale = {
      price: +price.replace(/,/g, '') || 0,
      saleImage: image,
    };

    dispatch(addSale({ dropId: drop.id, sale: newSale }))
      .unwrap()
      .then(() => setShowForm(false))
      .catch((err) => {
        setErrors(err);
      });
  };

  return (
    <form id="saleForm" className="form" onSubmit={submitForm}>
      <header>
        <h2 className="formTitle">Input sales info.</h2>
      </header>
      <main>
        <div className="formField price">
          <InputField
            id="price"
            label="Price"
            placeholder="0"
            value={price}
            onChange={changePrice}
          />
          <ValidationError message={errors.price} />
        </div>
        <div className="formField saleImage">
          <InputField
            id="image"
            label="Image (optional)"
            placeholder="https://www.image.com/image.png"
            value={image}
            onChange={e => setImage(e.target.value)}
          />
          <ValidationError message={errors.saleImage} />
        </div>
      </main>
      <footer>
        <button className="btn light submit" type="submit">Confirm</button>
      </footer>
    </form>
  );
};

export default SaleForm;

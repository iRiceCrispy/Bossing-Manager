import React from 'react';

const DropDownMenu = ({ matches, setter }) => {
  if (!matches?.length) return null;

  return (
    <div className='matches'>
      {matches.map((match, i) => (
        <div className='match' key={i} onClick={() => setter(match)}>{match}</div>
      ))}
    </div>
  );
};

export default DropDownMenu;

import React from 'react';

const DropDownMenu = ({ matches, setter }) => {
  if (!matches?.length) return null;

  return (
    <div className='matches'>
      {matches.map(match => (
        <div className='match' key={match.id} onClick={() => setter(match)}>{match.value}</div>
      ))}
    </div>
  );
};

export default DropDownMenu;

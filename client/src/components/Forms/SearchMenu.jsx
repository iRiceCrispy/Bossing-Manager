import React from 'react';

const SearchMenu = ({ matches, addMember }) => (
  <div className='searchMenu'>
    {matches.length ? (
      matches.map(match => (
        <div className='searchResult' key={match.id} onClick={() => addMember(match)}>{match.username}</div>
      ))
    ) : (
      <p>
        No users found.
      </p>
    )}
  </div>
);

export default SearchMenu;

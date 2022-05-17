import React from 'react';
import PropTypes from 'prop-types';
import './DropDownMenu.css';

const DropDownMenu = ({ matches, setter, setShowMenu }) => (
  <div className="dropdownMenu">
    {matches?.length
      ? matches.map(match => (
        <div
          className="dropdownOption"
          key={match.id}
          role="menuitem"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            setter(match);
            setShowMenu(false);
          }}
        >
          {match.value}
        </div>
      ))
      : <div className="noResults">No results found.</div>}
  </div>
);

DropDownMenu.propTypes = {
  matches: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ),
  setter: PropTypes.func.isRequired,
  setShowMenu: PropTypes.func.isRequired,
};

DropDownMenu.defaultProps = {
  matches: undefined,
};

export default DropDownMenu;

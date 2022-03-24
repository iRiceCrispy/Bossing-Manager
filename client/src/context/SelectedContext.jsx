import React, { createContext, useContext, useState, useMemo } from 'react';

export const SelectedContext = createContext();

export const useSelected = () => useContext(SelectedContext);

const SelectedProvider = ({ children }) => {
  const [selectedParty, setSelectedParty] = useState('');
  const [selectedDrop, setSelectedDrop] = useState('');

  const memo = useMemo(
    () => ({
      selectedParty,
      setSelectedParty,
      selectedDrop,
      setSelectedDrop,
    }),
    [selectedParty, selectedDrop]
  );

  return (
    <SelectedContext.Provider
      value={memo}
    >
      {children}
    </SelectedContext.Provider>
  );
};

export default SelectedProvider;

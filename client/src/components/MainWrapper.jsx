import React from 'react';
import Navigation from './Navigation';

const MainWrapper = props => (
  <>
    <Navigation />
    <main>
      {props.children}
    </main>
  </>
);

export default MainWrapper;

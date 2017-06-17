import React from 'react';
import ReactDOM from 'react-dom';

import MainItemBox from './components/MainItemBox';
import ItemGraphWrapper from './components/ItemGraphWrapper';

ReactDOM.render(
  <div>
    <MainItemBox id="12002"></MainItemBox>
    <ItemGraphWrapper id="12002" duration="year"></ItemGraphWrapper>
  </div>,
  document.getElementById('root')
);

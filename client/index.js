import React from 'react';
import ReactDOM from 'react-dom';

import SearchBar from './components/SearchBar';
import Router from './components/Router';

ReactDOM.render(
  <div>
    <div className="header">
      <SearchBar></SearchBar>
    </div>
    <Router></Router>
  </div>,
  document.getElementById('root')
);

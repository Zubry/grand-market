import React from 'react';
import ReactDOM from 'react-dom';

import ResultItem from './ResultItem.js';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { results: [] };
  }

  search(term) {
    fetch(`/api/v1/search/${term}`)
      .then(res => res.json())
      .then(results => this.setState({ results }))
  }

  navigateTo(event) {
    if (event.key == 'Enter') {
      history.pushState(null, 'Search', `/search/${event.target.value}`)
    }
  }

  render() {
    return <div className="search-bar">
      <input type="search"
        onChange={e => this.search(e.target.value)}
        onKeyPress={e => this.navigateTo(e)}
        placeholder="Search for an item...">
      </input>
      <div className="result-list">
        {
          this.state.results
            .slice(0, 10)
            .map(item => <ResultItem iid={item.id} name={item.name}></ResultItem>)
        }
      </div>
    </div>
  }
}

import React from 'react';
import ReactDOM from 'react-dom';

import MainItemBox from './MainItemBox';
import ItemGraphWrapper from './ItemGraphWrapper';

export default class Router extends React.Component {
  constructor(props) {
    super(props);

    this.state = { route: window.location.pathname };
  }

  componentDidMount() {
    setInterval(() => this.setState({ route: window.location.pathname }), 250);
  }

  render() {
    return <div>
      {
        this.state.route === '/'
        && <div>Suggested here</div>
      }
      {
        this.state.route.split('/')[1] === 'item'
        && <div>
          <MainItemBox id={this.state.route.split('/')[2]}></MainItemBox>
          <ItemGraphWrapper id={this.state.route.split('/')[2]} duration="year"></ItemGraphWrapper>
        </div>
      }
      {
        this.state.route.split('/')[1] === 'search'
        && <div>
          Search here
        </div>
      }
    </div>
  }
}

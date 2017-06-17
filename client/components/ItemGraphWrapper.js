import React from 'react';
import ReactDOM from 'react-dom';

import ItemGraph from './ItemGraph';

export default class ItemGraphWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = { duration: 'week' };

    this.switchDuration = this.switchDuration.bind(this);
  }

  switchDuration(to) {
    console.log('called', to);
    this.setState({ duration: to })
  }

  render() {
    return <div className="item-graph">
      <h2>Price Graph</h2>
      <div className="duration-selector">
        <button onClick={() => this.switchDuration('year')}>Year</button>
        <button onClick={() => this.switchDuration('month')}>Month</button>
        <button onClick={() => this.switchDuration('week')}>Week</button>
        <button onClick={() => this.switchDuration('day')}>Day</button>
      </div>
      <hr></hr>
      <ItemGraph id={this.props.id} duration={this.state.duration}></ItemGraph>
    </div>
  }
}

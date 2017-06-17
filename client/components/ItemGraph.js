import React from 'react';
import ReactDOM from 'react-dom';

export default class ItemGraph extends React.Component {
  constructor(props) {
    super(props);

    this.state = { graph: [] };
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevprops) {
    if (prevprops.id !== this.props.id || prevprops.duration !== this.props.duration) {
      this.canvasParent.firstChild.remove();
      this.canvasParent.innerHTML = '<canvas></canvas>';
      this.loadData();
    }
  }

  loadData() {
    fetch(`/api/v1/item/${this.props.id}/graph/${this.props.duration}`)
      .then(res => res.json())
      .then(graph => this.setState({ graph }))
      .then(_ => this.loadChart())
  }

  loadChart() {
    const prices = this.state.graph
      .map(({ ts, overallPrice }) => ({ x: ts, y: overallPrice }))

    const sell = this.state.graph
      .map(({ ts, sellingPrice, overallPrice }) => ({ x: ts, y: sellingPrice || overallPrice }))

    const buy = this.state.graph
      .map(({ ts, buyingPrice, overallPrice }) => ({ x: ts, y: buyingPrice || overallPrice }))

    const context = this.canvasParent.firstChild.getContext('2d');

    const chart = new Chart(context, {
      type: 'line',
      data: {
        datasets: [{
          label: "Price over time",
          data: prices,
          borderColor: '#C03221',
          backgroundColor: 'transparent'
        }, {
          label: "Sell price over time",
          data: sell,
          borderColor: '#3F826D',
          backgroundColor: 'transparent'
        }, {
          label: "Offer price over time",
          data: buy,
          borderColor: '#545E75',
          backgroundColor: 'transparent'
        }]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              tooltipFormat: 'MMM Mo, YYYY [at] h:mm a',
              displayFormats: {
                quarter: 'MMM YYYY'
              }
            }
          }],
        },
      }
    });
  }

  render() {
    return this.state.graph.length > 0 ?
      <div ref={(canvasParent) => { this.canvasParent = canvasParent; }} style={{ height: '100%' }}>
        <canvas height="240" width="400"></canvas>
      </div>

    :
      <div className="loading"></div>
  }
}

import React from 'react';
import ReactDOM from 'react-dom';

export default class MainItemBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = { item: {} };
  }

  componentDidMount() {
    fetch(`/api/v1/item/${this.props.id}`)
      .then(res => res.json())
      .then(item => this.setState({ item }))
  }

  numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  formatGP(number) {
    return `${this.numberWithCommas(number)} GP`;
  }

  formatFinancial(number) {
    if (number < 0) {
      return <span style={{ color: '#C03221', fontWeight: 'bold '}}>{this.numberWithCommas(number)}</span>
    } else if (number > 0) {
      return <span style={{ color: '#3F826D', fontWeight: 'bold '}}>+{this.numberWithCommas(number)}</span>
    } else {
      return <span style={{ color: '#2B2B2B', fontWeight: 'bold '}}>{this.numberWithCommas(number)}</span>
    }
  }

  render() {
    return this.state.item.info ?
      <div className="main-item-box">
        <h2>{this.state.item.info.name}</h2>
        <hr></hr>
        <table>
          <tbody>
            <tr>
              <td rowSpan="4" className="thumbnail-large">
                <img src={`http://services.runescape.com/m=itemdb_oldschool/1497524709366_obj_big.gif?id=${this.state.item.info.id}`}/>
              </td>
              <td className="td-label">Current price:</td>
              <td>{this.formatGP(this.state.item['current-price'])}</td>
              <td className="td-label">Buying quantity:</td>
              <td>{this.state.item['buying-quantity']}</td>
            </tr>
            <tr>
              <td className="td-label">Offer price:</td>
              <td>{this.formatGP(this.state.item['offer-price'])}</td>
              <td className="td-label">Selling quantity:</td>
              <td>{this.state.item['selling-quantity']}</td>
            </tr>
            <tr>
              <td className="td-label">Selling price:</td>
              <td>{this.formatGP(this.state.item['sell-price'])}</td>
              <td className="td-label">Buy/Sell ratio:</td>
              <td>{this.formatFinancial(this.state.item['ratio'].toFixed(2))}</td>
            </tr>
            <tr>
              <td className="td-label">Profit:</td>
              <td>{this.formatFinancial(this.state.item['margin'])}</td>
              <td className="td-label">Return:</td>
              <td>{this.formatFinancial((((this.state.item['sell-price'] - this.state.item['offer-price']) / this.state.item['offer-price']) * 100).toFixed(2))}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    :
      <div className="loading"></div>
  }
}

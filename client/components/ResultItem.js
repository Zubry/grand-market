import React from 'react';
import ReactDOM from 'react-dom';

export default class ResultItem extends React.Component {
  constructor(props) {
    super(props);
  }

  navigateTo(target) {
    history.pushState(null, this.props.name, `/item/${this.props.iid}`)
  }

  render() {
    return <div className="result-item" onClick={e => this.navigateTo(e)}>
      <img src={`http://services.runescape.com/m=itemdb_oldschool/1497868303764_obj_sprite.gif?id=${this.props.iid}`}/><span>{this.props.name}</span>
    </div>
  }
}

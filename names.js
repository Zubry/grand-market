const OSBuddy = require('osbuddy-api-wrapper');

const api = new OSBuddy({
  cache: {
    'max-age': 15
  }
})

class Items {
  constructor() {
    this.names = {};
    this.ids = {};

    this.load();
    setInterval(() => this.load(), 15 * 60 * 1000);
  }

  load() {
    api
      .names()
      .then(names => names
        .reduce(([names, ids], x) => {
          names[x.name.toLowerCase()] = x;
          ids[x.id] = x;
          return [names, ids];
        }, [{}, {}])
      )
      .then(([names, ids]) => {
        this.names = names
        this.ids = ids
      })
  }

  format({ name, id, overall_average, buy_average, sell_average }) {
    return {
      name,
      id,
      'current-price': overall_average,
      'offer-price': buy_average,
      'sell-price': sell_average,
      'margin': sell_average - buy_average,
      'return-on-investment': (sell_average - buy_average) / buy_average * 100
    }
  }

  search(term) {
    return Object.keys(this.names)
      .filter(name => name.includes(term))
      .sort()
      .map(name => this.format(this.names[name]))
      .slice(0, 10)
  }

  get(name) {
    return this.names[name.toLowerCase()]
  }

  getById(id) {
    return this.ids[id]
  }

  values() {
    return Object.keys(this.names)
      .map(key => this.names[key])
  }

  suggested() {
    return this
      .values()
      .filter(({ buy_average, sell_average }) => buy_average && sell_average)
      .filter(({ buy_average, sell_average }) => (sell_average - buy_average) / buy_average > 0.01)
      .filter(({ overall_average }) => overall_average > 100000)
      .map(row => this.format(row))
  }
}

module.exports = Items;

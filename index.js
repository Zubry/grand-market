const OSBuddy = require('osbuddy-api-wrapper');

const osbuddy = new OSBuddy({
  cache: {
    'max-age': 15
  }
});

const Items = require('./names');
const items = new Items();

const express = require('express')
const app = express()

const api = express();

const path = require('path');

api.get('/', function(req, res) {
  res.json(items.suggested());
});

api.get('/search/', function(req, res) {
  res.json([]);
});

api.get('/search/:term', function(req, res) {
  res.json(items.search(req.params.term));
});

api.get('/item/:id/graph/:duration', (req, res) => {
  let daysAgo = 0;
  let interval = 0;

  switch(req.params.duration) {
    case 'day':
      daysAgo = 1;
      interval = 1;
      break;
    case 'week':
      daysAgo = 7;
      interval = 6;
      break;
    case 'month':
      daysAgo = 30;
      interval = 48;
      break;
    case 'year':
      daysAgo = 365;
      interval = 24 * 14;
      break;
  }

  const timeAgo = new Date();
  timeAgo.setDate(timeAgo.getDate() - daysAgo);

  osbuddy
    .graph({
      id: req.params.id,
      interval: interval * 60,
      start: timeAgo.getTime()
    })
    .catch(err => res.status(500).json({ error: err }))
    .then(data => res.json(data));
})

api.get('/item/:id', (req, res) => {
  osbuddy
    .item(req.params.id)
    .then(data => {
      data.info = items.getById(req.params.id)
      return data;
    })
    .then(data => res.json(data));
})

app.use('/api/v1/', api);
app.get('/bundle.js', (req, res) => res.sendFile(path.join(__dirname + '/dist/bundle.js')));
app.get('/style.css', (req, res) => res.sendFile(path.join(__dirname + '/dist/style.css')));

app.get('/*', (req, res) => res.sendFile(path.join(__dirname + '/dist/index.html')));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

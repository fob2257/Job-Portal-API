const http = require('http');
const express = require('express');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const _ = require('lodash');

const db = require('./models');
const router = require('./routes');

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

db.sequelize.sync({ force: false })
  .then(() => console.log('models synced!'))
  .catch(e => console.log(e));

app.use(expressValidator());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.status(200).send();
  }
  req.db = db;
  return next();
});

app.use('/public', express.static(__dirname + '/public'))
app.use(router);


server.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

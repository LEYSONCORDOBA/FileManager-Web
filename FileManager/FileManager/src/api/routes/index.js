'use strict';
const { Router } = require('express');
const user = require('./user');
const tag = require('./tag');
const file = require('./file');

const app = Router();

user(app);
tag(app);
file(app);

app.get('/', (req, res) => {
  res.send({ status: 'API IS RUNNING' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ message: err.message || err });
});

module.exports = app;

const express = require('express');
const middlewares = require('./middlewares');
const db = require('./database');
const router = require('./routes');

require('dotenv').config({ silent: true });

const app = express();

app.use(...middlewares);

router.registerApplicationRoutes(app);

db.sequelize.sync().then(
    function () {
      console.log("DB connected successfully!");
    },
    function (err) {
      // handling db connection error
      console.error(err);
    }
);

module.exports = app;
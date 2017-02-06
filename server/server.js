const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./services/auth');
const MongoStore = require('connect-mongo')(session);
const schema = require('./schema/schema');

const app = express();

// replace with your Mong DB connection URI:
const MONGO_URI = '';
if (!MONGO_URI) {
  throw new Error('You must provide a Mongo Atlas URI');
}

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URI);
mongoose.connection
  .once('open', () => console.log('Connected to Mongo Atlas instance.'))
  .on('error', (error) =>
    console.log('Error connecting to Mongo Atlas:', error)
  );

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: 'change_me',
    store: new MongoStore({
      url: MONGO_URI,
      autoReconnect: true
    })
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true
  })
);

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;

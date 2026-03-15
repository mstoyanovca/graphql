import express from 'express'
import { createHandler } from 'graphql-http/lib/use/express';
import mongoose from 'mongoose'
import passport from 'passport'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passportConfig from './services/auth.js'
import schema from './schema/schema.js'
const app = express();
const MONGO_URI = 'mongodb+srv://mstoyanovca:Z9Fo8riMb5g16nv4@lyricaldb.nswhgst.mongodb.net/?appName=lyricaldb';

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
    secret: 'change_me',
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
    }),
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  '/graphql',
  createHandler ({
    schema,
    graphiql: true
  })
);

import webpackMiddleware from 'webpack-dev-middleware'
import webpack from 'webpack'
import webpackConfig from '../webpack.config.js'
app.use(webpackMiddleware(webpack(webpackConfig)));

export default app;

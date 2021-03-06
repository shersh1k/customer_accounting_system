import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as cors from 'cors';
import * as mongoose from 'mongoose';
import * as favicon from 'serve-favicon';
import * as path from 'path';
import config from './_config/db';
import User from './models/User';
import Order from './models/Order';
import Note from './models/Note';
import Customer from './models/Customer';
import Expense from './models/Expense';
import passport from './passport/passport';
import routes from './routes';

User; //из-за использования импортов приходится делать так TODO найти решение покрасивше
Order;
Note;
Customer;
Expense;
passport;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon', 'favicon.ico')));
app.use(express.static(__dirname + '/public/'));
app.use(session({ secret: 'conduit', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
mongoose.connect(config.url, { useNewUrlParser: true, useCreateIndex: true });
app.use(routes);

app.get('/manifest.json/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'manifest.json'));
});
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(process.env.PORT || 8000, function() {
  console.log('Listening on port', process.env.PORT || 8000);
});

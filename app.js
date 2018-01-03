const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const config = require('./config/secret');
const morgan = require('morgan');
const methodOverride = require('method-override');
const getPostSupport = require('express-method-override-get-post-support');
const login = require('./routes/login');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: [config.secret]
}));

app.use(methodOverride(
  getPostSupport.callback,
  getPostSupport.options // { methods: ['POST', 'GET'] }
));

app.use(morgan('tiny'));
app.use((req, res, next) => {
  ['query', 'params', 'body'].forEach((key) => {
    if (req[key]) {
      var capKey = key[0].toUpperCase() + key.substr(1);
      var value = JSON.stringify(req[key], null, 2);
      console.log(`${ capKey }: ${ value }`);
    }
  });
  next();
});

app.use(express.static(`${__dirname}/public`));
app.engine('handlebars', exphbs({defaultLayout: 'application'}));
app.set('view engine', 'handlebars');


app.use('/', login);


app.listen(3000, () => {
  console.log('Listening on port 3000');
});

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./models/user');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const blogsRouter = require('./routes/blogs');
const categoryRouter = require('./routes/category');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
var compression = require('compression');
var helmet = require('helmet');

require('dotenv').config();
var app = express();
app.use(helmet());

const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: 'sessions',
  autoRemove: true,
});
db.on('error', console.error.bind(console, 'MONGODB connection error:'));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

//setting origin to exact route may cause problems. request headers dont send exact origin route.
app.use(cors({ origin: 'https://alex-lvl.github.io', credentials: true }));
app.use(cookieParser());
app.use(
  session({
    store: store,
    secret: process.env.TOKEN_KEY,
    resave: false,
    saveUninitialized: false,
    maxAge: 1000 * 60 * 60 * 24, // One day
    cookie: {
      sameSite: false,
      maxAge: 1000 * 60 * 60 * 24, // One day
      secure: true,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression()); // Compress all routes
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/blogs', blogsRouter);
app.use('/category', categoryRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // passwords match! log user in
          return done(null, user);
        } else {
          // passwords do not match!
          return done(null, false, { message: 'Incorrect password' });
        }
      });
    });
  })
);

passport.serializeUser(function (user, done) {
  console.log('serializing user:', user);
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  console.log('deserializing user with id:', id);
  User.findById(id, function (err, user) {
    console.log('deserialized user:', user);
    done(err, user);
  });
});

// const JWTstrategy = require('passport-jwt').Strategy;
// const ExtractJWT = require('passport-jwt').ExtractJwt;

// passport.use(
//   new JWTstrategy(
//     {
//       jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//       secretOrKey: process.env.TOKEN_KEY,
//     },
//       async function(token, done) {
//         try {
//           console.log(token);
//           return done(null, token.user);
//         } catch (error) {
//           done(error);
//         }
//       }
//       //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
//       // return User.findOneById(jwtPayload.id)
//       //     .then(user => {
//       //         return cb(null, user);
//       //     })
//       //     .catch(err => {
//       //         return cb(err);
//       //     });
//   )
// );

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

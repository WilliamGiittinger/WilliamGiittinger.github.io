if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

/* Module requirements */
const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

/* Require DB schemas */
require('./app_server/models/db');
require('./app_server/models/zookeeper');
require('./app_server/models/animal');

/* Passport and parser setups */
const initializePassport = require('./passport-config');

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
app.use('/public', express.static(path.join(__dirname, '/public')));

/* Router variables and router setup */
const indexRouter = require('./app_server/routes/indexRoute');
const loginRouter = require('./app_server/routes/loginRoute');
const registerRouter = require('./app_server/routes/registerRoute');
const welcomeRouter = require('./app_server/routes/welcomeRoute');

app.use('/', indexRouter);
app.use('/login', authenticationIsChecked, loginRouter);
app.use('/register', authenticationIsChecked, registerRouter);
app.use('/welcome', authenticationCheck, welcomeRouter);
app.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
})


/* Set server to run ejs engine */
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'ejs')

/* If user is authenticated, perform next step */
function authenticationCheck(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

/* If user is authenticated, disallow returning to login and register pages until logged out */
function authenticationIsChecked(req, res, next) {
    if(req.isAuthenticated()) {
        return res.redirect('/welcome');
    }
    next();
}

app.listen(3000);

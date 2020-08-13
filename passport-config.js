const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Zookeeper = mongoose.model('zookeepers');
const bcrypt = require('bcrypt');

/* Define local authentication strategy */
passport.use(new LocalStrategy({
    usernameField: 'email'
},
(email, password, done) => {
    Zookeeper.findOne({ email: email }, (err, user) => {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, {
                message: 'Incorrect email.'
            });
        }
        if (!user.passwordCheck(password)) {
            return done(null, false, {
                message: 'Incorrect password.'
            });
        }
        return done(null, user);
    });
}
));

/* Serialization for broswer cookie,
   Allows session access to req.user.* */
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    Zookeeper.findById(id, (err, user) => {
        done(err, user);
    });
});
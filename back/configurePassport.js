const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const db = require('./db/MongoUtils');


const bcrypt = require('bcrypt');
const saltRounds = 10;


// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
    function (username, password, cb) {
        console.log(username, password, cb, 'passport')

        db.findOne({ "username": username }, 'users', (user) => {
            if (user) {
                bcrypt.compare(password, user.password).then(function (result) {
                    // result == true
                    if (result) {
                        console.log('passport right password')
                        cb(null, user);
                    }
                    else {
                        console.log('passport worg password')
                        cb(null, false)
                    }
                });
            }
            else {
                console.log('passport no existe username')
                cbk(new Error("no existe el usuario"));
            }
        });
    }));




// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function (user, cb) {
    cb(null, user.username);
});

passport.deserializeUser(function (username, cb) {
    db.findOne({ "username": username }, 'users', (user) => {
        if (user) {
            cb(null, user);
        }
        else {
            console.log('User not found')
            cb(new Error("no existe el usuario"));
        }
    });
});

const configurePassport = app => {


    // Use application-level middleware for common functionality, including
    // logging, parsing, and session handling.
    app.use(require('morgan')('combined'));

    app.use(
        require('express-session')({
            secret: process.env.secretKey,
            resave: false,
            saveUninitialized: false
        }));

    // Initialize Passport and restore authentication state, if any, from the
    // session.
    app.use(passport.initialize());
    app.use(passport.session());
};
module.exports = configurePassport;
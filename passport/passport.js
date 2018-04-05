let LocalStrategy = require('passport-local').Strategy;
let bcrypt = require('bcrypt-nodejs');
let connection = require('../connection/mysqlconnection');

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        console.log(user.id);
       done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        console.log('dessss');
        connection.query('select * from users where id =?', id, function (err, rows) {
            done(null, rows[0]);
        });
    });

    passport.use(new LocalStrategy({
        usernameField: 'usuario',
        passwordField: 'password',
        passReqToCallback: true
        },
        function (req, usuario, password, done) {
        connection.query('select * from users where usuario=?', usuario, function (err, rows) {
            if (err) throw err;
            if (rows == "") return done(null, false);
            if (rows != ""){
                let user = rows[0];
                bcrypt.compare(password, user.hash, function(err, comp) {
                    if (!comp) {
                        return done(null, false)
                    } else {
                        return done(null, user)
                    }
                });
            }
        })
    }))

};
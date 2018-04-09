let connection = require('../connection/mysqlconnection');
let users = {};
let bcrypt = require('bcrypt-nodejs');

users.register = function (user, cb) {
  if(!connection) return cb('No se ha podido crear la conexion');
  connection.query('SELECT * FROM users WHERE usuario=? or email=?',[user.usuario, user.email], function(err1, res1) {
      if (err1) return cb(err1);
      if (res1 == "") {
          connection.query('INSERT INTO users SET ?', user, function (err, result) {
              if (err) return cb(err);
              return cb(null, 3)
          });
      } else if (res1.length>1) {
          return cb(null, 1);
      } else {
          if (res1[0].usuario === user.usuario) {
              return cb(null, 1)
          }
          if (res1[0].email === user.email) {
              return cb(null, 2)
          }
      }
  })
};

users.login = function (user, cb) {
  if(!connection) return cb('No se ha podido crear la conexion');
  connection.query('SELECT * FROM users WHERE usuario=?', user.usuario_login, function(err1, res1) {
      if (err1) return cb(err1);
      if(res1 == "") {
          return cb(null, null, 1)
        } else {
          let userDB = {
              usuario: res1[0].usuario,
              isAdmin: res1[0].isAdmin
          };
          bcrypt.compare(user.password_login, res1[0].hash, function(err, comp) {
              if (!comp) {
                  return cb(null, null, 2)
              } else {
                  return cb(null, userDB, 3)
              }
          });
      }
  });
};

module.exports = users;

let connection = require('../connection/mysqlconnection');
let destinations = {};

destinations.getDestinos = function (cb) {
  if(!connection) return cb('No se ha podido crear la conexion');
  connection.query('SELECT * FROM destinos', function(err, res) {
      if (err) return cb(err);
      if(res){
          return cb(null, res)
      }
  });
};

destinations.deleteDestino = function (id, cb) {
  if(!connection) return cb('No se ha podido crear la conexion');
  connection.query('DELETE FROM destinos WHERE id=?', id, function(err, deleted) {
      console.log(deleted);
      if (err) return cb(err);
      if (deleted){
          return cb (null, null);
      }
  });
};

destinations.updateActive = function (id, cb) {
  if(!connection) return cb('No se ha podido crear la conexion');
  connection.query('SELECT * FROM destinos WHERE id=?', id, function(err, destino) {
      console.log(destino);
      if (err) return cb(err);
      let activeStatus = destino[0].active;
      let newStatus = !activeStatus;
      connection.query('UPDATE destinos SET active=? where id=?', [newStatus, id], function(err, toUptade) {
          return cb (null, null);
      });
  });
};

destinations.addDestiny = function (destiny, cb) {
  if(!connection) return cb('No se ha podido crear la conexion');
    connection.query('INSERT INTO destinos SET ?', destiny, function (err, result) {
        console.log(err);
        if (err) return cb(err);
        return cb(null, true)
    });
};

module.exports = destinations;

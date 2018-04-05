let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt-nodejs');
let usersModel = require('../models/usersModels');
let destinos = [];

router.get('/', function(req, res, next) {
    usersModel.getDestinos(function (err, dest) {
       if (err) return res.status(500).json(err);
       destinos = dest;
          res.render('main.hbs', {
              title: 'Geekshubs Travell',
              layout: 'template',
              destinos: destinos
          })
    });
});

// router.get('/admin', function(req, res, next) {
//     usersModel.getDestinos(function (err, dest) {
//        if (err) return res.status(500).json(err);
//        destinos = dest;
//           res.render('admin', {
//               title: 'Geekshubs Travell',
//               layout: 'template',
//               destinos: destinos
//           })
//     });
// });

// router.get('/admin/delete/:id', function(req, res, next) {
//     let reqId = req.params.id;
//     let destino = reqId.substr(1);
//     usersModel.deleteDestino(destino, function (err, dest) {
//        if (err) return res.status(500).json(err);
//        destinos = dest;
//           res.redirect('/admin');
//     });
// });

// router.get('/active/:id', function(req, res, next) {
//     let reqId = req.params.id;
//     let destino = reqId.substr(1);
//     usersModel.updateActive(destino, function (err, dest) {
//         if (err) return res.status(500).json(err);
//         destinos = dest;
//         res.redirect('/admin');
//     });
// });

router.post('/admin/add', function(req, res, next) {
    let active = 0;
    if (req.body.active == 'on'){
        active = 1;
    }
    let destino = {
      city: req.body.city,
      country: req.body.country,
        price: req.body.price,
        image: req.body.image,
        type: req.body.type,
        description: req.body.description,
        active: active
    };
    console.log(destino);
    usersModel.addDestiny(destino, function (err, dest) {
        if (err) return res.status(500).json(err);
        res.redirect('/admin');
    });
});

router.get('/registro', function(req, res, next) {
  res.render('registro.hbs', {
        title: 'Registro',
        layout: 'template',
  })
});

router.post('/register', function(req, res){
    let hash = bcrypt.hashSync(req.body.password_sec);
    let user = {
        usuario: req.body.usuario,
        email: req.body.email,
        password: req.body.password_sec,
        hash: hash
    };
    usersModel.register(user, function (err, data) {
        if (err) return res.status(500).json(err);
        switch (data){
            case 1:
                res.render('registro', {
                    title: 'Registro',
                    layout: 'template',
                    errorUsuario:true
                });
                break;
            case 2:
                res.render('registro', {
                    title: 'Registro',
                    layout: 'template',
                    errorEmail:true
                });
                break;
            case 3:
                res.render('login', {
                    title: 'Registro',
                    layout: 'template',
                    register: true
                });
                break;

        }
    });
});

router.get('/login', function(req, res, next) {
    res.render('login.hbs', {
        title: 'Login',
        layout: 'template'
    })
});

router.post('/login', function (req, res) {
    let user = {
        usuario_login: req.body.usuario,
        password_login: req.body.password
    };
    usersModel.login(user, function (err, data) {
        if (err) return res.status(500).json(err);
        switch (data){
            case 1:
                res.render('login', {
                    title: 'Login',
                    layout: 'template',
                    errorUsuario:true
                });
                break;
            case 2:
                res.render('login', {
                    title: 'login',
                    layout: 'template',
                    errorPassword:true
                });
                break;
            case 3:
                res.render('main', {
                    title: 'Geekshubs Travell',
                    layout: 'template',
                    logged: true,
                    destinos: destinos,
                    user
                });
                break;
        }
    });
});

// router.get('*', function(req, res, next) {
//   res.render('404.hbs', {
//         title: 'Error',
//         layout: 'template'
//   })
// });

module.exports = router;

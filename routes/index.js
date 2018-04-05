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

router.get('/registro', function(req, res, next) {
  res.render('registro.hbs', {
        title: 'Registro',
        layout: 'template',
  })
});

router.post('/registro', function(req, res){
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
                req.session.username = user.usuario_login;
                res.redirect('/admin');
                // res.render('main', {
                //     title: 'Geekshubs Travell',
                //     layout: 'template',
                //     logged: true,
                //     destinos: destinos,
                //     user
                // });
                break;
        }
    });
});

module.exports = router;

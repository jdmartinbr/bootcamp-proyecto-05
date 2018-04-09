let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt-nodejs');
let usersModel = require('../models/usersModels');
let destinationsModel = require('../models/destinationsModels');
let usersController = require('../controllers/userController');
let checkAccessUser = require('../middelwares/sessionSegurity');

router.get('/', checkAccessUser, function(req, res, next) {
    destinationsModel.getDestinos(function (err, destinos) {
       if (err) return res.status(500).json(err);
      res.render('main.hbs', {
          title: 'Geekshubs Travell',
          layout: 'template',
          isAdmin: req.isAdmin,
          isUser: req.isUser,
          destinos: destinos
      })
    });
});

router.get('/a', function (req, res, next) {
    let a = req.session;
    res.send(a);
});

router.get('/registro', function(req, res, next) {
  if (req.session.username) {
    next(err);
  }
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
    if (req.session.username) {
        next(err);
    }
    res.render('login.hbs', {
        title: 'Login',
        layout: 'template'
    })
});

router.post('/login', function (req, res) {
    usersController.login(req, res)
});

router.get('/logout', function (req, res, next) {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;

let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt-nodejs');
//let passport = require('passport');
let usersModel = require('../models/usersModels');
let winston = require('../config/winston');


/* GET users listing. */


router.get('/', function (req, res, next) {
    winston.error('error de winston');
    res.status(200).json(req.session || 'La sesion no se ha creado');
});

router.get('/create', function (req, res, next) {
    req.session.username = 'juandiego';
    req.session.isAdmin = 1;
    res.redirect('/admin')
});

router.get('/remove', function (req, res, next) {
   req.session.username = null;
   res.redirect('/admin');
});

router.get('/destroy', function (req, res, next) {
   req.session.destroy();
   res.redirect('/admin');
});

router.get('/privada', function (req, res, next) {
   if (req.session.isAdmin) {
    res.send('Has entrado');
   } else {
       res.redirect('/admin')
   }
});

router.get('/flashrecieve', function(req, res){
    res.render('login.hbs', {
         layout: 'template',
         messages: req.flash('info')
    });
});

router.get('/flashcreate', function(req, res, next){
    req.flash('info', 'Sesion flash creada');
    res.redirect('/admin/flashrecieve')
});

router.get('/panel', function (req, res) {
    usersModel.getDestinos(function (err, dest) {
        if (err) return res.status(500).json(err);
        destinos = dest;
        res.render('admin', {
            title: 'Geekshubs Travell',
            layout: 'template',
            destinos: destinos
        })
    });
});

router.get('/login', function(req, res){
    res.render('login.hbs', {
        layout: 'template'
    });
});

router.get('/register', function(req, res){
    res.render('registro.hbs', {
        layout: 'template'
    });
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
                req.session.user = user;
                console.log(req.session.user);
                res.redirect('/admin/panel');
                break;
        }
    });
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

// router.post('/login', passport.authenticate('local', {
//     failureRedirect: '/registro',
//     failureFlash : true
//     }),
//     function (req, res) {
//         res.render('login', {
//            layout: 'template',
//             isAuthenticated: req.isAuthenticated(),
//             user: req.user
//         });
//     }
// );

// function checkSignIn(req, res) {
//     if(req.session.user){
//         next();
//     } else {
//         let err = new Error('Not logged in');
//         next(err);
//     }
// }
module.exports = router;

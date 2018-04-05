let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt-nodejs');
//let passport = require('passport');
let usersModel = require('../models/usersModels');
let winston = require('../config/winston');


/* GET users listing. */

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

router.get('/', function(req, res, next) {
    if (req.session.username) {
        usersModel.getDestinos(function (err, dest) {
           if (err) return res.status(500).json(err);
           destinos = dest;
              res.render('admin', {
                  title: 'Geekshubs Travell',
                  layout: 'template',
                  destinos: destinos
              })
        });
    } else {
        res.redirect('/login')
    }
});

router.get('/delete/:id', function(req, res, next) {
    let reqId = req.params.id;
    let destino = reqId.substr(1);
    usersModel.deleteDestino(destino, function (err, dest) {
       if (err) return res.status(500).json(err);
       destinos = dest;
          res.redirect('/admin');
    });
});

router.get('/active/:id', function(req, res, next) {
    let reqId = req.params.id;
    let destino = reqId.substr(1);
    usersModel.updateActive(destino, function (err, dest) {
        if (err) return res.status(500).json(err);
        destinos = dest;
        res.redirect('/admin');
    });
});

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

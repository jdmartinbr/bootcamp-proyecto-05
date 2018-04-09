let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt-nodejs');
let destinationsModel = require('../models/destinationsModels');
let winston = require('../config/winston');
let checkAccessUser = require('../middelwares/sessionSegurity');

/* GET users listing. */

router.get('/', checkAccessUser, function(req, res, next) {
    destinationsModel.getDestinos(function (err, destinos) {
        if (err) return res.status(500).json(err);
        if (req.session.isAdmin) {
            res.render('admin', {
                title: 'Geekshubs Travell',
                layout: 'template',
                isAdmin: req.isAdmin,
                isUser: req.isUser,
                destinos
            })
        } else {
            res.redirect('/')
        }
    });
});

router.get('/delete/:id', function(req, res, next) {
    let reqId = req.params.id;
    destinationsModel.deleteDestino(reqId, function (err, dest) {
       if (err) return res.status(500).json(err);
       destinos = dest;
          res.redirect('/admin');
    });
});

router.get('/active/:id', function(req, res, next) {
    let reqId = req.params.id;
    destinationsModel.updateActive(reqId, function (err, dest) {
        if (err) return res.status(500).json(err);
        destinos = dest;
        res.redirect('/admin');
    });
});

router.post('/edit', function(req, res, next) {
    let destination = {
        city: req.body.city,
        country: req.body.country,
        price: req.body.price,
        image: req.body.image,
        type: req.body.type,
        description: req.body.description,
        active: req.body.active - 1 ,
    };
    let id = req.body.id;
    destinationsModel.editDestination(destination, id, function (err, row) {
        if (err) return res.status(500).json(err);
        res.redirect('/admin');
    });
});

router.post('/add', function(req, res, next) {
    let destination = {
        city: req.body.city,
        country: req.body.country,
        price: req.body.price,
        image: req.body.image,
        type: req.body.type,
        description: req.body.description,
        active: req.body.active
    };
    destinationsModel.addDestination(destination, function (err, dest) {
        if (err) return res.status(500).json(err);
        res.redirect('/admin');
    });
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



module.exports = router;

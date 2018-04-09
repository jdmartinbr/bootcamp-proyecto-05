let usersModel = require('../models/usersModels');
let userController = {};

userController.login = function (req, res){
    let user = {
        usuario_login: req.body.usuario,
        password_login: req.body.password
    };
    usersModel.login(user, function (err, data, options) {
        if (err) return res.status(500).json(err);
        switch (options) {
            case 1:
                res.render('login', {
                    title: 'Login',
                    layout: 'template',
                    errorUsuario: true
                });
                break;
            case 2:
                res.render('login', {
                    title: 'login',
                    layout: 'template',
                    errorPassword: true
                });
                break;
            case 3:

                req.session.username = data.usuario;
                req.session.isAdmin = data.isAdmin;
                res.redirect('/');
                break;
        }
    })
};

module.exports = userController;

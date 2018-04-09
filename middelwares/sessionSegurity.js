
function checkAccessUser(req, res, next) {
    if(req.session.isAdmin){
        req.isUser = req.session.username;
        req.isAdmin = true;
        next();
    } else if (req.session.username){
        req.isUser = req.session.username;
        req.isAdmin = false;
        next();
    } else {
        req.isUser = false;
        req.isAdmin = false;
        next();
    }
}

module.exports = checkAccessUser;

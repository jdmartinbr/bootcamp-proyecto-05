
function checkAccessUser(req, res, next) {
    console.log(req.session);
    if(req.session.isAdmin){
        req.isUser = true;
        req.isAdmin = true;
        next();
    } else if (req.session.username){
        req.isUser = true;
        req.isAdmin = false;
        next();
    } else {
        req.isUser = false;
        req.isAdmin = false;
        next();
    }
}

module.exports = checkAccessUser;

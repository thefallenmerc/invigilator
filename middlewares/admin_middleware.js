'use strict';

module.exports = function(req, res, next) {
    // Do your thing
    if(req.user.role === "admin") {
        return next();
    } else {
        return res.status(403).json({
            "message": "Only admins can access it!"
        });
    }
}
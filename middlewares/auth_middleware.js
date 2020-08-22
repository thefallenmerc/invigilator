'use strict';

const JWT = require('jsonwebtoken');
const ResponseHelper = require('../helpers/response_helper');
const User = require('../models/User');

async function AuthMiddleware(req, res, next) {
    // get Authorization header
    const { authorization } = req.headers;
    if (!authorization) {
        return ResponseHelper.s401(res, null, "Unauthenticated!");
    }
    // get token
    const [_, token] = authorization.split(" ");
    // verify JWT
    try {
        const isVerified = await JWT.verify(token, process.env.APP_KEY);
        // get user
        const user = await (await User.findOne({
            email: isVerified.email
        }));
        // add token to user
        user.token = isVerified;
        // add user to request
        req.user = user;
        return next();
    } catch (error) {
        return ResponseHelper.s401(res, null, "Invalid token!");
    }
}

module.exports = AuthMiddleware;
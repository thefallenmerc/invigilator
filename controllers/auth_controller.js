const bcrypt = require("bcrypt");
const User = require("../models/User");
const { response } = require("express");
const Helper = require("../config/helper");

module.exports = class AuthController {
    static async register(req, res) {
        try {
            // hash the password
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            // check if already there
            if(await User.exists({email: req.body.email})) {
                return res.json({
                    error: {
                        email: "Email Already Exists"
                    }
                });
            };
            // create the user
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            });
            await user.save();
            // return the user
            return res.json({ user })
        } catch (err) {
            return Helper.response.s500(res);
        }
    }
}
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Helper = require("../config/helper");
const JWT = require('jsonwebtoken');

const LoginValidator = require('../validators/login_validator');
const Validator = require('../validators/validator');
const UserResource = require("../resources/user_resource");
const ResponseHelper = require("../helpers/response_helper");
const { all } = require("../routes/api");

module.exports = class AuthController {
    static async register(req, res) {
        try {
            // hash the password
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            // check if already there
            if (await User.exists({ email: req.body.email })) {
                return res.json({
                    error: {
                        email: [
                            "Email Already Exists"
                        ]
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

    static async login(req, res) {
        const { email, password } = req.body;
        // user
        const user = await User.findOne({ email });
        // check user
        if (!user) {
            return res.json({
                email: [
                    "Invalid user email!"
                ]
            }, 422);
        }
        // check password
        if (! await bcrypt.compare(password, user.password)) {
            return res.json({
                error: "Invalid password!"
            }, 401);
        }

        // generate jwt token
        const token = await JWT.sign(user.toObject(), process.env.APP_KEY, { expiresIn: "365days" })

        user.token = token;

        // return user
        return res.json(new UserResource(user))
    }

    static profile(req, res) {
        const { user } = req;
        delete user.token;
        return res.status(200).json(user);
    }

    static async update(req, res) {
        const validator = new Validator(req.body, {
            name: "string|required"
        });

        if (validator.fails()) {
            return ResponseHelper.s422(res, validator.errors().all());
        }

        // update user
        const user = await User.findOneAndUpdate({
            email: req.user.email
        }, {
            name: validator.validated.name
        }, {
            new: true
        });

        return res.json(user);
    }
}
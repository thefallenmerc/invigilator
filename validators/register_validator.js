const Validator = require('./validator');

class RegisterValidator extends Validator {

    constructor(data = {}, rules = {}, messages = {}) {
        /**
         * Define You rules here
         */
        rules = {
            name: "required|string",
            email: "required|email",
            password: "required|string",
        };

        super(data, rules, messages);
    }

    /**
     * 
     * Static function that validates a incoming request as a middleware
     * 
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @param {express.Next} next 
     */
    static middleware(req, res, next) {
        const validator = new RegisterValidator(req.body);
        // check if data is valid
        if (validator.fails()) {
            // return error in case data invalid
            return res.json(validator.errors());
        } else {
            // set validated values a req.body
            req.body = validator.validated;
            // continue with next middleware
            next();
        }
    }

}

module.exports = RegisterValidator;
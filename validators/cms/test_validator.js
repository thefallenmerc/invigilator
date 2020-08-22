const Validator = require('../validator');

class TestValidator extends Validator {

  constructor(data = {}, rules = {}, messages = {}) {
    /**
     * Define You rules here
     */
    rules = {
      title: "string|required",
      timeAlloted: "numeric|required",
      description: "string|required",
      questions: "array",
      "questions.*.title": "string|required",
      "questions.*.description": "string",
      "questions.*.isMCQ": "boolean|required",
      "questions.*.options": "array",
      "questions.*.options.*": "string|required",
      "questions.*.answer": "string",
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
    const validator = new TestValidator(req.body);
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

module.exports = TestValidator;
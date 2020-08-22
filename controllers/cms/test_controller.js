const Test = require("../../models/Test");

module.exports = class TestController {
  static async index(req, res) {
    return res.json(await Test.find({ user: req.user.id }));
  }

  static async create(req, res) {
    const test = await Test.create({ user: req.user.id, ...req.body });
    return res.json({
      message: "Test Added!",
      test
    });
  }

  static delete(req, res) { }
};

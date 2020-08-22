const Test = require("../../models/Test");
const ResponseHelper = require("../../helpers/response_helper");
const Validator = require('../../validators/validator');
const mongoose = require("mongoose");
const UserTest = require("../../models/UserTest");

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

  /**
   * Assign Test to user
   * @param {*} req 
   * @param {*} res 
   */
  static async assignTest(req, res) {

    const validator = new Validator(req.body, {
      test: "string|required",
      batch: "string|required",
      date: "date|required",
      users: "array|required|min:1",
      "users.*": "string|required",
    });

    if (validator.fails()) {
      return ResponseHelper.s422(res, validator.errors().all());
    }

    const { validated } = validator;

    // get all mongoose ids
    const { test, users } = validated;

    let invalidIds = {};
    let idIsInvalid = false;
    // check if test is valida mongoose id
    if (!mongoose.Types.ObjectId.isValid(test)) {
      invalidIds.test = test + " is invalid id";
      idIsInvalid = true;
    }
    // check if user is valid mongoose id
    if (users.length === 1) {
      if (!mongoose.Types.ObjectId.isValid(users[0])) {
        invalidIds.users = [users[0]];
      }
    } else {
      invalidIds.users = users.reduce((a, v) => {
        if (!Array.isArray(a)) {
          if (!mongoose.Types.ObjectId.isValid(a)) {
            a = [a + " is invalid id"];
            idIsInvalid = true;
          }
          if (!Array.isArray(a)) {
            a = [];
          }
        }
        if (!mongoose.Types.ObjectId.isValid(v)) {
          a.push(v + " is invalid id");
          idIsInvalid = true;
        }
        return a;
      });
    }

    // if there are some invalid ids lets inform user
    if (idIsInvalid) {
      return ResponseHelper.s422(res, invalidIds);
    }

    // create the tests for users
    const tests = await UserTest.create(users.map(user => {
      return {
        test: validated.test,
        batch: validated.batch,
        date: validated.date,
        user
      }
    }));

    return res.json({
      message: "Test Created For Users",
      tests
    });
  }

  static delete(req, res) { }
};

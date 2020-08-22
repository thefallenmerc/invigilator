const mongoose = require('mongoose');
const ResponseHelper = require('../helpers/response_helper');
const UserTest = require('../models/UserTest');

class TestController {

    static async get(req, res) {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return ResponseHelper.s400(res, null, "Invalid Test Id");
        }

        const userTest = await UserTest.findOne({
            _id: id,
            user: req.user._id
        });

        if (!userTest) {
            return ResponseHelper.s404(res, null, "Test not found!");
        }

        return res.json(userTest);
    }

}

module.exports = TestController;
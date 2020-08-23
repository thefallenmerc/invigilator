const mongoose = require('mongoose');
const ResponseHelper = require('../helpers/response_helper');
const UserTest = require('../models/UserTest');
const moment = require('moment');

class TestController {

    static async get(req, res) {
        // get id
        const { id } = req.params;

        // validate id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return ResponseHelper.s400(res, null, "Invalid Test Id");
        }

        // get test from db
        const userTest = await UserTest.findOne({
            _id: id,
            user: req.user._id
        }).populate('test');

        // validate test
        if (!userTest) {
            return ResponseHelper.s404(res, null, "Test not found!");
        }

        // if the date of test has passed
        if (moment(userTest.date).isBefore(moment().format('YYYY-MM-DD'))) {
            await userTest.update({
                isExpired: true,
                isCompleted: false,
                result: "disqualified"
            });
            return ResponseHelper.s400(res, null, "Test expired!");
        }

        // if the time allotted is expired
        if (userTest.startTime && moment(userTest.startTime).add(userTest.test.timeAlloted, 'minutes').isBefore(moment.now())) {
            return ResponseHelper.s400(res, null, "Test time allotted expired!");
        }

        // return test
        return res.json(userTest);
    }

    static async start(req, res) {
        // get id
        const { id } = req.params;

        console.log(moment().format('HH:mm:SS'));

        // validate id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return ResponseHelper.s400(res, null, "Invalid Test Id");
        }

        // get test from db
        const userTest = await UserTest.findOne({
            _id: id,
            user: req.user._id
        }).populate('test');

        // validate test
        if (!userTest) {
            return ResponseHelper.s404(res, null, "Test not found!");
        }

        // if test is already complete
        if (userTest.isCompleted || userTest.isExpired) {
            return ResponseHelper.s400(res, null, "Test expired!");
        }

        // if the date of test has passed
        if (moment(userTest.date).isBefore(moment().format('YYYY-MM-DD'))) {
            await userTest.updateOne({
                isExpired: true,
                isCompleted: false,
                result: "disqualified"
            });
            return ResponseHelper.s400(res, null, "Test expired!");
        }

        // if the time allotted is expired
        if (userTest.startTime && moment(userTest.startTime).add(userTest.test.timeAlloted, 'minutes').isBefore(moment.now()) && isCompleted === false) {
            await userTest.updateOne({
                isExpired: true,
                isCompleted: false,
                result: "disqualified"
            });
            return ResponseHelper.s400(res, null, "Test time allotted expired!");
        }

        // if test is not already started, start it
        if(!userTest.startTime) {
            await userTest.updateOne({
                startTime: moment.now()
            });
        }

        // populate the test
        await userTest.populate('test')

        // return test
        return res.json(userTest);
    }

}

module.exports = TestController;
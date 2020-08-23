const mongoose = require('mongoose');
const ResponseHelper = require('../helpers/response_helper');
const UserTest = require('../models/UserTest');
const moment = require('moment');
const Validator = require('../validators/validator');
const { response } = require('express');

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

    /**
     * Function to start the test (save startTime)
     * and return user test with test details
     * 
     * @param {*} req 
     * @param {*} res 
     */
    static async start(req, res) {
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


        // check if test expired
        const isExpired = await TestController.checkIfTestExpired(userTest);
        if(isExpired) {
            return ResponseHelper.s400(res, null, "Test expired!");
        }

        // if test is not already started, start it
        if (!userTest.startTime) {
            await userTest.updateOne({
                startTime: moment.now()
            });
        }

        // populate the test
        await userTest.populate('test')

        // return test
        return res.json(userTest);
    }

    /**
     * Function to save the answer for a question,
     * for a specific test
     * 
     * @param {*} req 
     * @param {*} res 
     */
    static async save(req, res) {

        const validator = new Validator(req.body, {
            answer: "string|required"
        });

        if(validator.fails()) {
            return ResponseHelper.s422(res, validator.errors().all());
        }

        // get id and questionId
        const { id, questionId } = req.params;

        // validate id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return ResponseHelper.s400(res, null, "Invalid Test Id");
        }
        // validate questionId
        if (!mongoose.Types.ObjectId.isValid(questionId)) {
            return ResponseHelper.s400(res, null, "Invalid Question Id");
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

        // check if test is started
        if(!userTest.startTime) {
            return ResponseHelper.s400(res, null, "Test not started Yet!");
        }

        // check if test expired
        const isExpired = await TestController.checkIfTestExpired(userTest);
        if (isExpired) {
            return ResponseHelper.s400(res, null, "Test expired!");
        }

        // save the answer
        userTest.answers.push({
            question: questionId,
            answer: req.body.answer
        })
        
        await userTest.save();

        return res.json(userTest);


    }

    /**
     * Given a test, check if it is expired or not
     * 
     * @param {*} userTest 
     */
    static async checkIfTestExpired(userTest) {


        // if test is already complete
        if (userTest.isCompleted || userTest.isExpired) {
            return true;
        }

        // if the date of test has passed
        if (moment(userTest.date).isBefore(moment().format('YYYY-MM-DD'))) {
            await userTest.updateOne({
                isExpired: true,
                isCompleted: false,
                result: "disqualified"
            });
            return true;
        }

        // if the time allotted is expired
        if (userTest.startTime && moment(userTest.startTime).add(userTest.test.timeAlloted, 'minutes').isBefore(moment.now()) && isCompleted === false) {
            await userTest.updateOne({
                isExpired: true,
                isCompleted: false,
                result: "disqualified"
            });
            return true;
        }

        return false;
    }

}

module.exports = TestController;
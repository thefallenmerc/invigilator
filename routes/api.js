"use strict";

/**
 * Initialization
 */
const express = require("express");
const router = express.Router();
const storage = require("../config/storage");

/**
 * Import all controllers
 */
const SampleController = require("../controllers/sample_controller");
/**
 * Import all the middlewares
 */
const SampleMiddleware = require("../middlewares/sample_middleware");
const AuthController = require("../controllers/auth_controller");

router.post('/auth/register', AuthController.register);

router.get('/version', SampleMiddleware, SampleController.index);

module.exports = router;

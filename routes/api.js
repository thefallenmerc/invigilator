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
const LoginValidator = require("../validators/login_validator");
const RegisterValidator = require("../validators/register_validator");
const TestController = require("../controllers/cms/test_controller");
const TestValidator = require("../validators/cms/test_validator");
const AuthMiddleware = require("../middlewares/auth_middleware");

// Authetication
router.post('/auth/register', RegisterValidator.middleware, AuthController.register);
router.post('/auth/login',LoginValidator.middleware, AuthController.login);

router.get('/auth/profile', AuthMiddleware, AuthController.profile);
router.post('/auth/profile', AuthMiddleware, AuthController.update);

// cms
// Test Controller
router.get('/cms/test', AuthMiddleware, TestController.index);
router.post('/cms/test', AuthMiddleware, TestValidator.middleware, TestController.create);

router.get('/version', SampleMiddleware, SampleController.index);

module.exports = router;

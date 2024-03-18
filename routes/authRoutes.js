const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const router = express.Router();

// Signup route
router.post('/signup', [
  body('name').notEmpty().withMessage('Name is required'),
  body('cnic').isLength({ min: 13, max: 13 }).withMessage('CNIC must be 13 characters long'),
  body('email').isEmail().withMessage('Email must be a valid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('role').isIn(['NURSE', 'HEADNURSE']).withMessage('Invalid role specified'),
], authController.signup);

// Login route
router.post('/login', [
  body('email').isEmail().withMessage('Email must be a valid email address'),
  body('password').exists().withMessage('Password is required'),
], authController.login);

module.exports = router;

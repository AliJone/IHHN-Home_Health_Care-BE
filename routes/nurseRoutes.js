const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const nurseController = require('../controllers/nurseController');

router.post('/', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('cnic').isLength({ min: 13, max: 13 }).withMessage('CNIC must be exactly 13 characters long'),
  body('picture').optional().isURL().withMessage('Picture must be a valid URL'),
  body('email').isEmail().withMessage('Email must be a valid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('role').isIn(['NURSE', 'HEADNURSE']).withMessage('Role must be either NURSE or HEADNURSE')
], nurseController.createNurse);

router.get('/', nurseController.getAllNurses);

router.get('/:id', [
  param('id').isInt().withMessage('Nurse ID must be an integer')
], nurseController.getNurseById);

router.put('/:id', [
  param('id').isInt().withMessage('Nurse ID must be an integer'),
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('cnic').optional().isLength({ min: 13, max: 13 }).withMessage('CNIC must be exactly 13 characters long'),
  body('picture').optional().isURL().withMessage('Picture must be a valid URL'),
  body('email').optional().isEmail().withMessage('Email must be a valid email address'),
  body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('role').optional().isIn(['NURSE', 'HEADNURSE']).withMessage('Role must be either NURSE or HEADNURSE')
], nurseController.updateNurse);

router.delete('/:id', [
  param('id').isInt().withMessage('Nurse ID must be an integer')
], nurseController.deleteNurse);

router.get('/:id/schedules', [
  param('id').isInt().withMessage('Nurse ID must be an integer')
], nurseController.getNurseSchedules);

router.get('/:id/patients', [
  param('id').isInt().withMessage('Nurse ID must be an integer')
], nurseController.getNursePatients);

module.exports = router;

const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.post('/', [
  body('name').notEmpty().withMessage('Name is required'),
  body('causeOfIssue').notEmpty().withMessage('Cause of issue is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('dateOfAdmission').isISO8601().withMessage('Date of admission must be a valid date'),
  body('diagnosis').notEmpty().withMessage('Diagnosis is required'),
  body('dischargeSummary').optional().isString().withMessage('Discharge summary must be a string'),
  body('medicationNotes').optional().isString().withMessage('Medication notes must be a string'),
], patientController.createPatient);

router.get('/', patientController.getAllPatients);

router.get('/:id', [
  param('id').isInt().withMessage('Invalid patient ID')
], patientController.getPatientById);

router.put('/:id', [
  param('id').isInt().withMessage('Invalid patient ID'),
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('causeOfIssue').optional().notEmpty().withMessage('Cause of issue cannot be empty'),
  body('location').optional().notEmpty().withMessage('Location cannot be empty'),
  body('dateOfAdmission').optional().isISO8601().withMessage('Date of admission must be a valid date'),
  body('diagnosis').optional().notEmpty().withMessage('Diagnosis cannot be empty'),
  body('dischargeSummary').optional().isString().withMessage('Discharge summary must be a string'),
  body('medicationNotes').optional().isString().withMessage('Medication notes must be a string'),
], patientController.updatePatient);

router.delete('/:id', [
  param('id').isInt().withMessage('Invalid patient ID')
], patientController.deletePatient);

router.get('/:id/schedules', [
  param('id').isInt().withMessage('Invalid patient ID')
], patientController.getPatientSchedules);

router.get('/:id/administrations', [
  param('id').isInt().withMessage('Invalid patient ID')
], patientController.getPatientAdministrations);

module.exports = router;

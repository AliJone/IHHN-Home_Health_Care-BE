const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const administrationController = require('../controllers/administrationController');

router.post('/', [
  body('date').isISO8601().withMessage('Valid date is required'),
  body('patientId').isInt().withMessage('Valid patientId is required'),
], administrationController.createAdministration);

router.get('/patient/:patientId', [
  param('patientId').isInt().withMessage('Valid patientId is required'),
], administrationController.getAdministrationsByPatient);

router.put('/:id', [
  param('id').isInt().withMessage('Valid administrationId is required'),
  body('date').optional().isISO8601().withMessage('Valid date is required'),
  body('nurseId').isInt().withMessage('Valid nurseId is required'),
], administrationController.updateAdministration);

router.delete('/:id', [
  param('id').isInt().withMessage('Valid administrationId is required'),
], administrationController.deleteAdministration);

router.post('/:administrationId/adminPoints', [
  param('administrationId').isInt().withMessage('Valid administrationId is required'),
  body('note').notEmpty().withMessage('Note is required'),
  body('picture').optional().isURL().withMessage('Valid URL is required for the picture'),
  body('nurseNotes').notEmpty().withMessage('Nurse notes are required'),
  body('value').optional().notEmpty().withMessage('Value cannot be empty if provided'), // Added validation for optional value field
], administrationController.addAdminPoint);

router.put('/adminPoints/:adminPointId', [
  param('adminPointId').isInt().withMessage('Valid adminPointId is required'),
  body('note').optional().notEmpty().withMessage('Note cannot be empty'),
  body('picture').optional().isURL().withMessage('Valid URL is required for the picture'),
  body('nurseNotes').optional().notEmpty().withMessage('Nurse notes cannot be empty'),
  body('value').optional().notEmpty().withMessage('Value cannot be empty if provided'), // Added validation for optional value field
], administrationController.updateAdminPoint);

router.delete('/adminPoints/:adminPointId', [
  param('adminPointId').isInt().withMessage('Valid adminPointId is required'),
], administrationController.deleteAdminPoint);

module.exports = router;

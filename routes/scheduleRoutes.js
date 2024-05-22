const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');

router.post('/', [
  body('date').isISO8601().withMessage('Date must be a valid ISO 8601 date'),
  body('status').isIn(['PENDING', 'CONFIRMED', 'CANCELED', 'COMPLETED']).withMessage('Invalid status value'),
  body('nurseId').isInt({ min: 1 }).withMessage('Nurse ID must be a positive integer'),
  body('patientId').isInt({ min: 1 }).withMessage('Patient ID must be a positive integer'),
], scheduleController.createSchedule);

router.put('/:id', [
  param('id').isInt({ min: 1 }).withMessage('Invalid schedule ID'),
  body('date').optional().isISO8601().withMessage('Date must be a valid ISO 8601 date'),
  body('status').optional().isIn(['PENDING', 'CONFIRMED', 'CANCELED', 'COMPLETED']).withMessage('Invalid status value'),
  body('cancelNote').optional().isString().withMessage('Cancel note must be a string'),
], scheduleController.updateSchedule);

router.delete('/:id', [
  param('id').isInt({ min: 1 }).withMessage('Invalid schedule ID'),
], scheduleController.deleteSchedule);

router.get('/:id', [
  param('id').isInt({ min: 1 }).withMessage('Invalid schedule ID'),
], scheduleController.getScheduleById);

router.get('/nurse/:nurseId', [
  param('nurseId').isInt({ min: 1 }).withMessage('Invalid nurse ID'),
], scheduleController.getSchedulesByNurse);

router.get('/patient/:patientId', [
  param('patientId').isInt({ min: 1 }).withMessage('Invalid patient ID'),
], scheduleController.getSchedulesByPatient);

router.get('/', scheduleController.getAllSchedules);

module.exports = router;

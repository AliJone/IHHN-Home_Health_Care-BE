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

router.post('/assign-patients', async (req, res) => {
  const { numNurses, numPatients } = req.body;
  const totalVertices = numNurses + numPatients + 2; // including source and sink
  const source = 0;
  const sink = numNurses + numPatients + 1;
  const graph = new EdmondsKarp(totalVertices);

  // Edges from source to nurses
  for (let i = 1; i <= numNurses; i++) {
      graph.addEdge(source, i, 1);
  }

  // Edges from nurses to patients
  for (let i = 1; i <= numNurses; i++) {
      for (let j = 1; j <= numPatients; j++) {
          graph.addEdge(i, numNurses + j, 1);
      }
  }

  // Edges from patients to sink
  for (let j = 1; j <= numPatients; j++) {
      graph.addEdge(numNurses + j, sink, 1);
  }

  const maxFlow = graph.getMaxFlow(source, sink);
  res.json({ maxAssigned: maxFlow });
});

module.exports = router;

const prisma = require('../dbClient/prismaClient');
const { validationResult } = require('express-validator');

const createPatient = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const patient = await prisma.patient.create({
      data: req.body,
    });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error creating patient', error: error.message });
  }
};

const getAllPatients = async (req, res) => {
  try {
    const patients = await prisma.patient.findMany();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving patients', error: error.message });
  }
};

const getPatientById = async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await prisma.patient.findUnique({
      where: { id: Number(id) },
    });
    if (patient) {
      res.json(patient);
    } else {
      res.status(404).json({ message: 'Patient not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving patient', error: error.message });
  }
};

const updatePatient = async (req, res) => {
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const patient = await prisma.patient.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.json(patient);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(500).json({ message: 'Error updating patient', error: error.message });
  }
};

const deletePatient = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.patient.delete({
      where: { id: Number(id) },
    });
    res.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(500).json({ message: 'Error deleting patient', error: error.message });
  }
};

const getPatientSchedules = async (req, res) => {
  const { id } = req.params;
  try {
    const schedules = await prisma.schedule.findMany({
      where: { patientId: Number(id) },
    });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving patient schedules', error: error.message });
  }
};

const getPatientAdministrations = async (req, res) => {
  const { id } = req.params;
  try {
    const administrations = await prisma.administration.findMany({
      where: { patientId: Number(id) },
    });
    res.json(administrations);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving patient administrations', error: error.message });
  }
};

module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
  getPatientSchedules,
  getPatientAdministrations,
};

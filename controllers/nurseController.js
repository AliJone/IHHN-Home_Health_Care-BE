const prisma = require('../dbClient/prismaClient');
const { validationResult } = require('express-validator');

const createNurse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, cnic, picture, email, role } = req.body;
    const nurse = await prisma.nurse.create({
      data: {
        name,
        cnic,
        picture,
        email,
        password,
        role,
      },
    });
    res.json(nurse);
  } catch (error) {
    res.status(500).json({ message: 'Error creating nurse', error: error.message });
  }
};

const getAllNurses = async (req, res) => {
  try {
    const nurses = await prisma.nurse.findMany();
    res.json(nurses);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving nurses', error: error.message });
  }
};

const getNurseById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const nurse = await prisma.nurse.findUnique({
      where: { id },
    });
    if (nurse) {
      res.json(nurse);
    } else {
      res.status(404).json({ message: 'Nurse not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving nurse', error: error.message });
  }
};

const updateNurse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const id = parseInt(req.params.id);
    const { name, cnic, picture, email, role } = req.body;
    const nurse = await prisma.nurse.update({
      where: { id },
      data: {
        name,
        cnic,
        picture,
        email,
        password,
        role,
      },
    });
    res.json(nurse);
  } catch (error) {
    res.status(500).json({ message: 'Error updating nurse', error: error.message });
  }
};

const deleteNurse = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.nurse.delete({
      where: { id },
    });
    res.json({ message: 'Nurse deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting nurse', error: error.message });
  }
};

const getNurseSchedules = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const schedules = await prisma.schedule.findMany({
      where: { nurseId: id },
    });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving schedules', error: error.message });
  }
};

const getNursePatients = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const patients = await prisma.patient.findMany({
      where: { nurseId: id },
    });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving patients', error: error.message });
  }
};

module.exports = {
  createNurse,
  getAllNurses,
  getNurseById,
  updateNurse,
  deleteNurse,
  getNurseSchedules,
  getNursePatients,
};

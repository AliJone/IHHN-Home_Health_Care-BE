const prisma = require('../dbClient/prismaClient');
const { validationResult } = require('express-validator');

const createSchedule = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { date, status, nurseId, patientId } = req.body;
    const schedule = await prisma.schedule.create({
      data: {
        date: new Date(date),
        status,
        nurseId,
        patientId,
      },
    });
    res.status(201).json(schedule);
  } catch (error) {
    res.status(500).json({ message: 'Error creating schedule', error: error.message });
  }
};

const updateSchedule = async (req, res) => {
  const { id } = req.params;
  const { date, status, cancelNote } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const schedule = await prisma.schedule.update({
      where: { id: parseInt(id) },
      data: {
        ...(date && { date: new Date(date) }),
        ...(status && { status }),
        ...(cancelNote && { cancelNote }),
      },
    });
    res.json(schedule);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.status(500).json({ message: 'Error updating schedule', error: error.message });
  }
};

const deleteSchedule = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.schedule.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.status(500).json({ message: 'Error deleting schedule', error: error.message });
  }
};

const getScheduleById = async (req, res) => {
  const { id } = req.params;
  try {
    const schedule = await prisma.schedule.findUnique({
      where: { id: parseInt(id) },
    });
    if (schedule) {
      res.json(schedule);
    } else {
      res.status(404).json({ message: 'Schedule not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching schedule', error: error.message });
  }
};

const getSchedulesByNurse = async (req, res) => {
  const { nurseId } = req.params;
  try {
    const schedules = await prisma.schedule.findMany({
      where: { nurseId: parseInt(nurseId) },
    });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching schedules for nurse', error: error.message });
  }
};

const getSchedulesByPatient = async (req, res) => {
  const { patientId } = req.params;
  try {
    const schedules = await prisma.schedule.findMany({
      where: { patientId: parseInt(patientId) },
    });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching schedules for patient', error: error.message });
  }
};

module.exports = {
  createSchedule,
  updateSchedule,
  deleteSchedule,
  getScheduleById,
  getSchedulesByNurse,
  getSchedulesByPatient,
};

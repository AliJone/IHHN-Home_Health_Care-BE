const prisma = require('../dbClient/prismaClient');
const { validationResult } = require('express-validator');

const createAdministration = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { date, patientId } = req.body;
    const administration = await prisma.administration.create({
      data: {
        date,
        patientId,
      },
    });
    res.status(201).json(administration);
  } catch (error) {
    res.status(500).json({ message: 'Error creating administration record', error: error.message });
  }
};

const updateAdministration = async (req, res) => {
  console.log(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { date, patientId, nurseId } = req.body;

  try {
    const administration = await prisma.administration.update({
      where: { id: parseInt(id) },
      data: {
        date,
        patientId,
        nurseId,
      },
    });
    res.json(administration);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Administration record not found' });
    }
    res.status(500).json({ message: 'Error updating administration record', error: error.message });
  }
};

const deleteAdministration = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.administration.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Administration record deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Administration record not found' });
    }
    res.status(500).json({ message: 'Error deleting administration record', error: error.message });
  }
};

const getAdministrationsByPatient = async (req, res) => {
  const { patientId } = req.params;

  try {
    const administrations = await prisma.administration.findMany({
      where: { patientId: parseInt(patientId) },
      include: { points: true }, // Include AdminPoints related to each Administration
    });
    res.json(administrations);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving administrations for patient', error: error.message });
  }
};
const addAdminPoint = async (req, res) => {
    const { administrationId } = req.params;
    const { note, picture, nurseNotes, nurseId } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const adminPoint = await prisma.adminPoint.create({
        data: {
          note,
          picture,
          nurseNotes,
          administrationId: parseInt(administrationId),
        },
      });
      res.status(201).json(adminPoint);
    } catch (error) {
      res.status(500).json({ message: 'Error adding AdminPoint', error: error.message });
    }
  };
  
  const updateAdminPoint = async (req, res) => {
    const { adminPointId } = req.params;
    const { note, picture, nurseNotes } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const adminPoint = await prisma.adminPoint.update({
        where: { id: parseInt(adminPointId) },
        data: {
          note,
          picture,
          nurseNotes,
        },
      });
      res.json(adminPoint);
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ message: 'AdminPoint not found' });
      }
      res.status(500).json({ message: 'Error updating AdminPoint', error: error.message });
    }
  };
  
  const deleteAdminPoint = async (req, res) => {
    const { adminPointId } = req.params;
  
    try {
      await prisma.adminPoint.delete({
        where: { id: parseInt(adminPointId) },
      });
      res.json({ message: 'AdminPoint deleted successfully' });
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ message: 'AdminPoint not found' });
      }
      res.status(500).json({ message: 'Error deleting AdminPoint', error: error.message });
    }
  };
  
module.exports = {
  createAdministration,
  updateAdministration,
  deleteAdministration,
  getAdministrationsByPatient,
  addAdminPoint,
  updateAdminPoint,
  deleteAdminPoint,
};

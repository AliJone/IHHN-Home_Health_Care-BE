const prisma = require('../dbClient/prismaClient');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, cnic, picture, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const nurse = await prisma.nurse.create({
      data: {
        name,
        cnic,
        picture,
        email,
        password: hashedPassword,
        role,
      },
    });
    res.status(201).json({ message: 'Nurse created', nurseId: nurse.id });
  } catch (error) {
    res.status(500).json({ message: 'Error signing up nurse', error: error.message });
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const nurse = await prisma.nurse.findUnique({ where: { email } });
    if (!nurse || !await bcrypt.compare(password, nurse.password)) {
      return res.status(401).json({ message: 'Email or password is incorrect' });
    }

    const token = jwt.sign(
      { nurseId: nurse.id, email: nurse.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, nurseId: nurse.id });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

module.exports = { signup, login };

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    log: ['info'],
});
require('dotenv').config();

module.exports = prisma;

const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.post('/nurses', async (req, res) => {
    const { name, cnic, picture, email, role } = req.body;
    const newNurse = await prisma.nurse.create({
        data: { name, cnic, picture, email, role },
    });
    res.json(newNurse);
});

app.get('/test', async (req, res) => {
    const allNurses = await prisma.nurse.findMany();
    res.json(allNurses);
});

async function main() {
    const newNurse = await prisma.nurse.create({
        data: {
            name: 'John Doe',
            cnic: '1234567890123',
            picture: 'url_to_picture',
            email: 'john.doe@example.com',
            role: 'NURSE', // Use 'HEADNURSE' for a head nurse
        },
    });
    console.log('Added new nurse:', newNurse);
}

// main()
//     .catch((e) => {
//         throw e;
//     })
//     .finally(async () => {
//         await prisma.$disconnect();
//     });

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

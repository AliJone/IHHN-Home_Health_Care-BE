const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json')
const prisma = require('./dbClient/prismaClient');
const authRoutes = require('./routes/authRoutes');
const nurseRoutes = require('./routes/nurseRoutes');
const patientRoutes = require('./routes/patientRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const administrationRoutes = require('./routes/administrationRoutes');
const generateSwaggerDoc = require('./swagger');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json()); 

app.use(cors());

app.use('/auth', authRoutes);
app.use('/nurses', nurseRoutes);
app.use('/patients', patientRoutes);
app.use('/schedules', scheduleRoutes);
app.use('/administrations', administrationRoutes);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile))


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

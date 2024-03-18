const swaggerAutogen = require('swagger-autogen')();
const fs = require('fs');
const dotenv = require('dotenv');


const outputFile = './swagger_output.json';
const endpointsFiles = ['./index.js'];
const ourHost = process.env.HOST || 'localhost:3000'
const doc = {
    host: ourHost,
    schemes: ['https'],
    securityDefinitions: {
        Bearer: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: "For accessing the secured endpoints, you must include this header with the format 'Bearer {token}'"
        }
    },
    security: [{ Bearer: [] }]
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    addTagsToSwagger(outputFile);
});

function addTagsToSwagger(swaggerOutputPath) {
    fs.readFile(swaggerOutputPath, 'utf8', (err, data) => {
        if (err) {
            console.error("Failed to read Swagger output file:", err);
            return;
        }
        const swaggerJson = JSON.parse(data);

        for (const [path, methods] of Object.entries(swaggerJson.paths)) {
            const segments = path.split('/');
            // Assuming the first relevant segment for the tag is right after the initial `/`
            const tag = segments[1] ? segments[1].charAt(0).toUpperCase() + segments[1].slice(1) : 'General';

            for (const method of Object.values(methods)) {
                if (!method.tags) {
                    method.tags = [];
                }
                if (!method.tags.includes(tag)) {
                    method.tags.push(tag);
                }
            }
        }

        fs.writeFile(swaggerOutputPath, JSON.stringify(swaggerJson, null, 4), (err) => {
            if (err) {
                console.error("Failed to write Swagger output file:", err);
                return;
            }
            console.log("Swagger documentation updated with dynamic tags.");
        });
    });
}

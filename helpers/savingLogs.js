const fs = require('fs');
const path = require('path');

// Ensure the directory for the log file exists; create it if it doesn't
const logsDirectory = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDirectory)){
    fs.mkdirSync(logsDirectory, { recursive: true });
}

const logFilePath = path.join(logsDirectory, 'logs.txt'); // Adjust the path for your log file

const logDbOperation = (operation, details) => {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} - Operation: ${operation}, Details: ${JSON.stringify(details)}\n`;

    // Open (and create if doesn't exist) a log file and append the log entry
    fs.open(logFilePath, 'a', (err, fd) => {
        if (err) {
            console.error('Error opening log file:', err);
            return;
        }

        fs.appendFile(fd, logEntry, (err) => {
            if (err) {
                console.error('Logging failed:', err);
            }
            fs.close(fd, (err) => {
                if (err) {
                    console.error('Error closing the log file:', err);
                }
            });
        });
    });
};

module.exports = logDbOperation;

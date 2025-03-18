const { getTestData } = require('../services/testService');

const testEndpoint = (req, res) => {
    try {
        const data = getTestData();
        res.status(200).json(data);
    } catch (error) {
        next(error); // Pass errors to the error handler
    }
};

module.exports = { testEndpoint };
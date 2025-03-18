const getTestData = () => {
    return {
        message: 'Test endpoint working!',
        status: 'success',
        timestamp: new Date().toISOString()
    };
};

module.exports = { getTestData };
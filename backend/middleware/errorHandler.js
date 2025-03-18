const errorHandler = (err, req, res, next) => {
    console.error('Error stack:', err.stack); // Log the full error

    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        // Handle JSON parsing errors
        return res.status(400).json({
            message: 'Invalid JSON format in request body',
            error: err.message
        });
    }

    res.status(500).json({
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
};

module.exports = errorHandler;
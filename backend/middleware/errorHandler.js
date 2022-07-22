
const errorHandler = (err, req, res, next) => {

    let statusCode = res.statusCode ? res.statusCode : 500;
    
    if (err.name === "CastError") {
        err.message = `This value is not found with ${err.value}`;
    };
    
    res.status(statusCode)
        .json({
            message: err.message,
            stack: process.env.NODE_ENV === "production" ? null : err.stack
        })
};

module.exports = {errorHandler};
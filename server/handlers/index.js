module.exports = {
    ...require('./auth')
}

module.exports.statusHandler = (req, res, next) => {
    const err = new Error('Not Found');

    err.status = 404;

    next(err);
}

module.exports.errorHandler = (err, req, res, next) => {
    res.status(err.status || 400).json({err: err.message || 'Server error'})
}
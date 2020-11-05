module.exports = {
    ...require('./auth'),
    ...require('./poll')
}

module.exports.statusHandler = (req, res, next) => {
    const err = new Error('Not Found');

    // console.log("error: ", res);
    err.status = 404;

    next(err);
}

module.exports.errorHandler = (err, req, res, next) => {
    res.status(err.status || 
        500).json(
            {err: err.message || 'Server error'})
}
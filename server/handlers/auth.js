const jwt = require('jsonwebtoken');

const db = require('../models');

exports.register = async (req, res, next) => {
    try {
        const user = await db.User.create(req.body);
        
        const token = jwt.sign({id, username}, process.env.SECRET);

        // console.log("REGISTER id", id);
        // console.log("REGISTER username", username);
        // console.log("REGISTER token", token);
        res.status(201).json({id, username, token});
    } catch (err) {
        if (err.code === 11000) {
            err.message = "That username is taken";
        }
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const user = await db.User.findOne({username: req.body.username});
        const {id, username} = user;
        const valid = await user.comparePassword(req.body.password);

        if (valid) {
            const token = jwt.sign({id, username}, process.env.SECRET);
            res.json({
                id, username, token
            });
            // console.log("LOGIN id", id);
            // console.log("LOGIN username", username);
            // console.log("LOGIN token", token);
        } else {
            throw new Error();
        }
    } catch (err) {
        err.message = 'Invalid username or password';
        next(err);
    }
}
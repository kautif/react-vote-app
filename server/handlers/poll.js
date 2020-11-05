const mongoose = require('mongoose');
const db = require('../models');

exports.showPolls = async (req, res, next) => {
    try {
        const polls = await db.Poll.find();
        console.log("showPolls: ", polls);
        return res.status(200).json(polls);
    } catch (err) {
        err.status = 400;
        next(err);
    }
}

exports.createPoll = async (req, res, next) => {
    try {
        console.log("createPoll req: ", req.decoded);
        const {id} = req.decoded;
        const {question, options} = req.body;
        const user = await db.User.findById(id);

        console.log("createPoll user: ", user);

        const poll = await db.Poll.create({
            question,
            user,
            options: options.map(option => ({
                option,
                votes: 0
            }))
        });

        console.log("createPoll poll: ", poll);
        user.polls.push(poll._id);
        res.status(201).json({
            ...poll._doc, 
            user: user._id   
        });
        // Only works and still reachable after return
        await user.save();
    } catch (err) {
        err.status = 400;
        next(err);
    }
}
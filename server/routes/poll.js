const router = require('express').Router();
const handler = require('../handlers');
const auth = require('../middlewares/auth');

// get all polls

// The GET and POST are both on /api/polls

router
.route('/')
.get(handler.showPolls)
.post(auth, handler.createPoll);

router.get('/user', auth, handler.userPolls);

router
.route('/:id')
.get()
.post()
.delete();

module.exports = router;
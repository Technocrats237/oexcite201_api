const jwt = require("jsonwebtoken")
const {User} = require('../models')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = await User.findOne({where: {username: user.username}});
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
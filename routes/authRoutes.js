const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../models');

router.route('/login')
    .post(function (req, res) {
        const { username, password } = req.body;
        console.log('body', req.body)
        User.findOne({ where: { username } })
            .then(async function (user) {
                if (user) {
                    const result = await bcrypt.compare(password, user.password);

                    if (result) {
                        const token = jwt.sign({ username }, process.env.JWT_SECRET);

                        return res.json({
                            token,
                            exp: Math.floor(Date.now() / 1000) + (60 * 60),
                            user
                        });
                    } else {
                        return res.status(401).json({ message: "Incorrect username or password" });
                    }
                } else {
                    return res.status(401).json({ message: "Incorrect username or password" });
                }

            })
    })

module.exports = router;

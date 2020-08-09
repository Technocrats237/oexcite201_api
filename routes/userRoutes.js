const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../models');

// get user lists
router.route('/')
    .get(function (req, res) {
        User.findAll().then(users => res.json(users));
    })
    .post(function (req, res) {
        const { username, password } = req.body;
        User.findAndCountAll({ where: { username } })
            .then(function (result) {
                if (result.count) {
                    return res.status(422).json({ message: "User already exists." })
                } else {
                    const data = {
                        username: username,
                        password: bcrypt.hashSync(password)
                    }
                    User.create(data)
                        .then(user => res.json(user));
                }
            })
    });
router.route('/auth')
    .get(function (req, res) {
        return res.status(200).json(req.user);
    });
router.route('/password')
    .post(function (req, res) {
        const {current, new_password} = req.body;
        bcrypt.compare(current, req.user.password)
            .then(valid => {
                if (valid) {
                    User.update({password: bcrypt.hashSync(new_password)}, {where: {username: req.user.username}})
                        .then(affected => {
                            return res.sendStatus(200);
                        })
                } else {
                    return res.status(400).json({message: "Unauthorised"});
                }
            })
        
    });
module.exports = router;

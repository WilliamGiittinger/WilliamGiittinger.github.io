const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Zookeeper = require('../models/zookeeper');

/* Render register page*/
const registerDisplay = (req, res) => {
    res.render('register.ejs');
};

/* Saves user in application memory (temporary solution) with a hashed password */
const registerUser = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        req.flash('warning', 'All fields required.')
        return res
            .status(400)
            .render('./register');
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
        // Create zookeeper object to place in DB
        const zookeeper = new Zookeeper({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        zookeeper
            .save()
            .then(result => {
                res
                    .status(200)
                    .render('./login');
            })
            .catch(err => {
                console.log(err.code);
                req.flash('warning', 'Email already in use.');
                res
                    .status(500)
                    .render('./register');
            });
        }
    catch (err) {
        console.log(err);
    }
};

module.exports = {
    registerDisplay,
    registerUser
};
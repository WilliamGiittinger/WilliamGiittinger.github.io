const request = require('request');
const lineReader = require('line-reader');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');

/* Render login page */
const loginDisplay = (req, res) => {
    res.render('./login');
};

module.exports = {
    loginDisplay
}
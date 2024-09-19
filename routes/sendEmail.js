const express = require('express');
const {model} = require('mongoose');
const { sendEmail } = require('../controllers/sendEmail');
const route = express.Router();

route.route('/').get(sendEmail);

module.exports = route;

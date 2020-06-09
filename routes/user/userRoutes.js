const express = require('express')
const app = express();

const userCtrl = require('../../services/user/user');
const userVal = require('../../middleware/Validations/userval')

app.post('/login', userVal.login, userCtrl._Login);

app.post('/createUser', userVal.createUser, userCtrl._CreateUser)

module.exports = app;
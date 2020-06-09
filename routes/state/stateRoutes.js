const express = require('express')
const app = express()
const stateCtrl = require('../../services/state/state')
const { authentication } = require('../../middleware/Auth/auth')
const { createStateVal } = require('../../middleware/Validations/stateval')

app.post('/create', authentication, createStateVal,  stateCtrl._CreateState )

app.get('/getstate', authentication, stateCtrl._GetStates);

module.exports = app;
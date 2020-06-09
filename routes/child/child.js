const express = require('express')
const app = express()
const chdCtrl = require('../../services/child/child')
const { authentication } = require('../../middleware/Auth/auth')
const { createChildVal } = require('../../middleware/Validations/childval')

app.post('/create', authentication, createChildVal,  chdCtrl._CreateChild )

app.get('/getChild', authentication, chdCtrl._GetChild);

app.get('/getChildDetail/:childId', authentication, chdCtrl._GetChildDetail);

module.exports = app;
const express = require('express')
const app = express()
const distCtrl = require('../../services/district/district')
const { authentication } = require('../../middleware/Auth/auth')
const { createDistrictVal } = require('../../middleware/Validations/districtval')

app.post('/create', authentication, createDistrictVal, distCtrl._CreateDistrict )

app.get('/getdistrict', authentication, distCtrl._GetDistrict);

module.exports = app;
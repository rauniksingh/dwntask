const express = require('express')
const app = express()

// Routers Config
app.use('/api/v1/user', require('./user/userRoutes')); // User service routes

app.use('/api/v1/state', require('./state/stateRoutes')); // State service routes

app.use('/api/v1/district', require('./district/districtRoutes')); // District service routes

app.use('/api/v1/child', require('./child/child')); // Child service routes

module.exports = app;

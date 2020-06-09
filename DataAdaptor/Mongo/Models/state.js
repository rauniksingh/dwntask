const mongoose = require('mongoose')
let stateSchema = mongoose.Schema({
    
    stateName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }

},{
    timestamps: true
});

let stateModel = mongoose.model('states', stateSchema, 'states');
module.exports = stateModel;
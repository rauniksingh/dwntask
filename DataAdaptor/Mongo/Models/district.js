const mongoose = require('mongoose')

let distSchema = mongoose.Schema({
    stateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'states',
        required: true
    },
    districtName: {
        type: String,
        required: true,
        lowercase: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
},{
    timestamps: true
});

let distModel = mongoose.model('districts', distSchema, 'districts');
module.exports = distModel 
const mongoose = require('mongoose');

let childSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },    
    sex: {
        type: String,
        enum: ['male', 'female']
    },
    dob: {
        type: Date
    },
    fatherName: {
        type: String
    },
    motherName: {
        type: String
    },
    districtId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'districts'
    },
    stateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'states'
    },
    photo: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
},{
    timestamps: true
});

let childModel = mongoose.model('child', childSchema, 'child');
module.exports = childModel;
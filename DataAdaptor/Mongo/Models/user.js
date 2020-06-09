const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

let userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    organisation: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    lastLoggedIn: {
        type: Date,
        default: new Date()
    }
}, {
    timestamps: true
});

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
  
//method to decrypt password
userSchema.methods.verifyPassword = function (password) {
    let user = this;
    return bcrypt.compareSync(password, user.password);
};

let userModel = mongoose.model('users', userSchema, 'users');
module.exports = userModel;
const userModel = require('../Models/user');

class UserQueries {

    async fetchUserByUsername(username) {
        return userModel.findOne({ username: username.toLowerCase() }).lean()
    };
    
    async fetchUser (username, password) {
        return userModel.findOne({ username: username, password: password }).lean();

    };

    async setlastLoginTime (id) {
        return userModel.findOneAndUpdate({ _id: id }, { $set: { lastLoggedIn: new Date() } });
    };

    async createUser (userObj) {
        let newUser = new userModel(userObj);
        newUser.password = await newUser.generateHash(userObj.password);
        let createUser = await newUser.save();
        return createUser;

    };
    
    async checkDuplicateUser (name) {
        return userModel.countDocuments({ username: name });
    };

};

module.exports = new UserQueries();
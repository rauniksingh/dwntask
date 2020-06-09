const __ = require('../../util/response');
const { createToken } = require('../../middleware/Auth/auth')
const userQuery = require('../../DataAdaptor/Mongo/Query/user')
const bcrypt = require('bcrypt');

class User {
    
  async _Login (req, res) {
        try {
                
            let userData = await userQuery.fetchUserByUsername(req.body.username);
            if (!userData) return __.customMsg(res, 404, `${req.body.username} does not exists`);
            
            const match = await bcrypt.compare(req.body.password, userData.password);
            if (!match)  return __.customMsg(res, 401, "Incorrect Password");

            let token = await createToken(userData._id)
            
            let obj = {
                    "success": true,
                    "status": 200,
                    "message": "Login successfull.",
                    "token": token,
                    "login_id": userData._id,
                    "last_login": userData.lastLoggedIn,
                    "timestamp": userData.createdAt
                };

            __.successMsg(req, res, 200, obj, undefined);
            
            await userQuery.setlastLoginTime(userData._id);

    } catch (error) {
       __.errorMsg(req, res, 500, 'Internal server error', error, '_Login')   
    };
  };  

  async _CreateUser (req, res) {
    try {

        let checkUsername = await userQuery.checkDuplicateUser(req.body.username);
        if (checkUsername) return __.customMsg(req, res, 400, 'Username already exists')

        await userQuery.createUser(req.body);

        __.successMsg(req, res, 201, undefined, 'User created')
    } catch (error) {
       __.errorMsg(req, res, 500, 'Internal server error', error, '_CreateUser')   
    };
  }; 

};

module.exports = new User();
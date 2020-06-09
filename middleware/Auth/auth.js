const jwt = require('jsonwebtoken')
const __ = require('../../util/response')
const userModel = require('../../DataAdaptor/Mongo/Models/user')
const { encryptorToken } = require('./encryptor')
const { decryptorToken } = require('./decryptor')

class Jwt {
  async createToken (userId) {
    return jwt.sign({ userId: encryptorToken(userId) }, process.env.SECRET_KEY, { expiresIn: '7d' })
  };

  async authentication (req, res, next) {
    try {
      const decoded = await jwt.verify(req.headers.authorization, process.env.SECRET_KEY)
      if (decoded) {
        const verifyUser = await userModel.findOne({ _id: decryptorToken(decoded.userId) }).lean();
        if (!verifyUser) return res.status(401).json({ message: 'Illegal access' })
        req.userId = verifyUser._id;
        next()
      };
    } catch (error) {
      return __.errorMsg(req, res, 401, error.message, error, 'authentication')
    };
  };
};

module.exports = new Jwt()


class SendResponse {
  errorMsg (req, res, status, message, error, scope) {
    console.log(error)
    res.status(status).json({ message: message })
  };

  successMsg (req, res, status, data, message) {
    res.status(status).json({ message: message, data: data })
  };

  customMsg (req, res, status, message) {
    res.status(status).json({ message: message })
  };
};

module.exports = new SendResponse()

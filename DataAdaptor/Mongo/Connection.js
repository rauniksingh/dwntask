const mongoose = require('mongoose');
      mongoose.Promise = global.Promise,
      chalk = require('chalk'),
      envConfig = require('../../Server');

//-----Database Connection----------
try {
    mongoose.connect(`mongodb://localhost:27017/${envConfig['MongoDB']['DatabaseName']}`,  { useFindAndModify:true, useUnifiedTopology: true, useNewUrlParser: true, 'useCreateIndex':true }).catch((err) => {
     if(err) return console.error(chalk.red(' [ ✗ ] '), err);
     console.log(chalk.green(' [ ✓ ]'), `Connected to Database : ${envConfig['MongoDB']['DatabaseName']}`); 
    }) 
  } catch (error) {
      return console.error(chalk.red(' [ ✗ ] '), error);
  };
//---------------------------------------

module.exports = mongoose;
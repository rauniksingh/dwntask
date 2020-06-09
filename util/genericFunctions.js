class GenericFunction {
  async IDGenerator () {
    this.length = 5
    this.timestamp = +new Date()

    const _getRandomInt = function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    }

    const ts = this.timestamp.toString()
    const parts = ts.split('').reverse()
    let id = ''

    for (var i = 0; i < this.length; ++i) {
      const index = _getRandomInt(0, parts.length - 1)
      id += parts[index]
    }

    return id
  };

  async concatMethod (argv1, argv2) {
    if (!argv2) {
      return argv1
    };

    return argv1 + ' ' + argv2
  };

  async formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  };

};

module.exports = new GenericFunction()

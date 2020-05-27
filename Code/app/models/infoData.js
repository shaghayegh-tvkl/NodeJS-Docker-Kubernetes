const database = require(`${config.path.database}/ShaghayeghDB`);
var promise = require('promise')
module.exports = new class serviceData extends database {
  constructor() {
    super();
  }



  addInformation(data) {
    return new promise((res, rej) => {
      this.insertIntoDatabase('Information', data).then(result => {
        res(result)
      }).catch(error => {
        rej(error)
      })
    })
  }

  getInformation(attribute) {
    return new promise((res, rej) => {
      this.findInDatabase('Information', attribute).then(result => {
        res(result)
      }).catch(error => {
        rej(error)
      })
    })
  }

}
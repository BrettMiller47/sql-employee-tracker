const Employee = require('../models/Employee');
const connection = require('../config/connection');

class Db {
  constructor(connection) {
    this.connection = connection;
  }

  findAllEmployees() {
    return this.connection.promise().query("SELECT * FROM workforce_db.employee;");
  }
}

module.exports = new Db(connection);
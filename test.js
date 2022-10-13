const connection = require('./config/connection');

connection
  .query("SELECT * FROM workforce_db.employee;")
  .then((result)=>console.log(result));
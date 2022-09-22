const employeeTable = require("./Employee");
const departmentTable = require("./Department");
const roleTable = require("./Role");
const Employee = require("./Employee");
const Role = require("./Role");
const Department = require("./Department");

// // Define a Role as having one Department to create a foreign key in the `departmentTable`
// roleTable.hasOne(Department, {
//   foreignKey: 'id',
// });

module.exports = { employeeTable, departmentTable, roleTable };

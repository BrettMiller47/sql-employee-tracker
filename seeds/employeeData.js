const { employeeTable } = require("../models");

const employeeSeedData = [
  {
    first_name: "Brett",
    last_name: "Miller",
    role: "OLP",
    department: "Materials",
    salary: 70000,
    manager: "Nicole Burnett"
  },
  {
    first_name: "John",
    last_name: "Furcick",
    role: "OLP",
    department: "DBS",
    salary: 70000,
    manager: "Jeff Hadjuk"
  },
];

const seedEmployeeTable = () => employeeTable.bulkCreate(employeeSeedData);

module.exports = seedEmployeeTable;

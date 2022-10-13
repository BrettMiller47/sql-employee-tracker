const { Employee } = require("../models");

const employeeSeedData = [
  {
    first_name: "Brett",
    last_name: "Miller",
    manager_id: null,
    role_id: 1
  },
  {
    first_name: "John",
    last_name: "Smith",
    manager_id: 1,
    role_id: 2
  },
];

const seedEmployeeTable = () => Employee.bulkCreate(employeeSeedData);

module.exports = seedEmployeeTable;

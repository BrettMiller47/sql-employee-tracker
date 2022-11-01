const { Employee } = require("../models");

const employeeSeedData = [
  {
    first_name: "Jackie",
    last_name: "Pazzone",
    manager_id: null,
    role_id: 1
  },
  {
    first_name: "Brett",
    last_name: "Miller",
    manager_id: 1,
    role_id: 2
  },
  {
    first_name: "Jane",
    last_name: "Doe",
    manager_id: null,
    role_id: 3
  },
  {
    first_name: "John",
    last_name: "Smith",
    manager_id: 3,
    role_id: 4
  }
];

const seedEmployeeTable = () => Employee.bulkCreate(employeeSeedData);

module.exports = seedEmployeeTable;

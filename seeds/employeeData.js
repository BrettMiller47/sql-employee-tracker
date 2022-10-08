const { Employee } = require("../models");

const employeeSeedData = [
  {
    first_name: "Brett",
    last_name: "Miller",
    manager_id: null
  },
  {
    first_name: "John",
    last_name: "Furcick",
    manager_id: 1
  },
];

const seedEmployeeTable = () => Employee.bulkCreate(employeeSeedData);

module.exports = seedEmployeeTable;

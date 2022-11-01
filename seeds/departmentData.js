const { Department } = require("../models");

const departmentSeedData = [
  {
    name: 'Finance'
  },
  {
    name: 'Sales'
  },
];

const seedDepartmentTable = () => Department.bulkCreate(departmentSeedData);

module.exports = seedDepartmentTable;

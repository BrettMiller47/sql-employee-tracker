const { Department } = require("../models");

const departmentSeedData = [
  {
    name: 'Finance'
  },
  {
    name: 'Marketing'
  },
];

const seedDepartmentTable = () => Department.bulkCreate(departmentSeedData);

module.exports = seedDepartmentTable;

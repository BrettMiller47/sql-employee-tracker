const { Department } = require("../models");

const departmentSeedData = [
  {
    name: 'Materials'
  },
  {
    name: 'DBS'
  },
];

const seedDepartmentTable = () => Department.bulkCreate(departmentSeedData);

module.exports = seedDepartmentTable;

const { Department } = require("../models");

const departmentSeedData = [
  {
    name: 'DBS'
  },
  {
    name: 'Materials'
  },
];

const seedDepartmentTable = () => Department.bulkCreate(departmentSeedData);

module.exports = seedDepartmentTable;

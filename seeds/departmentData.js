const { departmentTable } = require("../models");

const departmentSeedData = [
  {
    name: 'Materials'
  },
  {
    name: 'DBS'
  },
];

const seedDepartmentTable = () => departmentTable.bulkCreate(departmentSeedData);

module.exports = seedDepartmentTable;

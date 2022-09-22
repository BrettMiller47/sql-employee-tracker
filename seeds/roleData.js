const { roleTable } = require("../models");

const roleSeedData = [
  {
    title: "OLP1",
    salary: 70000,
    department: "Materials"
  },
  {
    title: "OLP2",
    salary: 70000,
    department: "DBS"
  }
];

const seedRoleTable = () => roleTable.bulkCreate(roleSeedData);

module.exports = seedRoleTable;

const { Role } = require("../models");

const roleSeedData = [
  {
    title: "OLP1",
    salary: 70000,
    department_id: 2
  },
  {
    title: "OLP2",
    salary: 70000,
    department_id: 1
  }
];

const seedRoleTable = () => Role.bulkCreate(roleSeedData);

module.exports = seedRoleTable;

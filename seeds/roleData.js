const { Role } = require("../models");

const roleSeedData = [
  {
    title: "Accountant",
    salary: 70000,
    department_id: 2
  },
  {
    title: "Sales Associate",
    salary: 70000,
    department_id: 1
  }
];

const seedRoleTable = () => Role.bulkCreate(roleSeedData);

module.exports = seedRoleTable;

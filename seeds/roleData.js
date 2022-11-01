const { Role } = require("../models");

const roleSeedData = [
  {
    title: "Accounting Manager",
    salary: 100000,
    department_id: 1
  },
  {
    title: "Accountant",
    salary: 70000,
    department_id: 1
  },
  {
    title: "Sales Manager",
    salary: 100000,
    department_id: 2
  },
  {
    title: "Sales Associate",
    salary: 70000,
    department_id: 2
  },
  {
    title: "Sales Lead",
    salary: 85000,
    department_id: 2
  }
];

const seedRoleTable = () => Role.bulkCreate(roleSeedData);

module.exports = seedRoleTable;

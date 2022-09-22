const sequelize = require("../config/connection.js");
const { Employee, departmentTable, Role } = require("../models");

const seedEmployeeTable = require("./employeeData.js");
const seedDepartmentTable = require("./departmentData.js");
const seedRoleTable = require("./roleData.js");
const Department = require("../models/Department.js");

require("dotenv").config();

// function to seed workforce_db with 3 tables (Employee, Department, and Role)
const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await seedDepartmentTable();
  await seedRoleTable();
  await seedEmployeeTable();
  process.exit(0);
};

seedDatabase();

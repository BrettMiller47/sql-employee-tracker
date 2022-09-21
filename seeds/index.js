const sequelize = require("../config/connection.js");
const seedEmployeeTable = require("./employeeData.js");
const { Employee } = require("../models");
require("dotenv").config();

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await seedEmployeeTable();
  process.exit(0);
};

seedDatabase();

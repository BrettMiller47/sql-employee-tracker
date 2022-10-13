const inquirer = require('inquirer');
const connection = require('./config/connection');

async function viewAllEmployees() {
  const employees = await connection.query("SELECT * FROM workforce_db.Employee;");
  const data = await console.log(employees);
  showMenu();
}

async function viewAllDepartments() {
  const departments = await connection.query("SELECT * FROM workforce_db.Department;");
  const data = await console.log(departments);
  showMenu();
}

async function viewAllRoles() {
  const roles = await connection.query("SELECT * FROM workforce_db.Role;");
  const data = await console.log(roles);
  showMenu();
}

function showMenu() {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Exit'],
        name: 'menu'
      }
    ]).then(async (choice) => {
      console.log(choice);
      if (choice.menu == 'View All Employees') {
        viewAllEmployees();
        
      } else if (choice.menu == 'Add Employee') {

      } else if (choice.menu == 'Update Employee Role') {

      } else if (choice.menu == 'View All Roles') {
        viewAllRoles();
        
      } else if (choice.menu == 'Add Role') {

      } else if (choice.menu == 'View All Departments') {
        viewAllDepartments();

      } else if (choice.menu == 'Add Department') {
      }
    });
}
showMenu();
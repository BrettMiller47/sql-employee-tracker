const inquirer = require('inquirer');
const connection = require('./config/connection');
const Department = require('./models/Department');

async function viewAllEmployees() {
  const employees = await connection.query("SELECT * FROM workforce_db.Employee;");
  console.table(employees[0]);
  showMenu();
}

async function viewAllDepartments() {
  const departments = await connection.query("SELECT * FROM workforce_db.Department;");
  console.table(departments[0]);
  showMenu();
}

async function viewAllRoles() {
  const roles = await connection.query("SELECT * FROM workforce_db.Role;");
  console.table(roles[0]);
  showMenu();
}

async function addDepartment(name) {
  const department = await Department.create({name: name});
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
        inquirer.prompt([{
          type: 'input',
          message: 'Enter department name: ',
          name: 'name'
        }]).then((ans) => addDepartment(ans.name));
      }
    });
}
showMenu();

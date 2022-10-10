const { json } = require('express');
const inquirer = require('inquirer');
const Employee = require('./models/Employee');
const Db = require('./db');
const sequelize = require('./config/connection');

// ? how to deal with Heroku ? 
// ? don't do fetch, what else?
// ! replicate viewEmployees() for other actions then it is good

async function viewEmployees() {
  // TODO: fetch the data from the api endpoint (/api/employees)
  db.findAllEmployees();
  // console.log(employees)
  // showMenu();
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
        // fetch all employees from workforce_db.Employee
        viewEmployees();

      } else if (choice.menu == 'Add Employee') {
        // db.query(`INSERT INTO employee(id, name, etc.) VALUES(${id}, ${name}, etc.);`);
      

      } else if (choice.menu == 'Update Employee Role') {
        // db.query(`;`);
      

      } else if (choice.menu == 'View All Roles') {
        // get the existing roles in workforce_db.Employee
        const jsonEmployees = await fetch('/api/employees', {
          method: "GET"
        });
        const jsonRoles = JSON.parse(jsonEmployees.role);
        console.log(jsonRoles);
        // prompt the user to choose an existing role to view
        const role = await inquirer.prompt([
          {
            type: 'list',
            message: 'Which role would you like to view?'
          }
        ]);
        // fetch all roles from workforce_db.Employee
        const response = await fetch("/api/employees", {
          method: "GET",
          body: {
            role: choice.role
          }
        });

      } else if (choice.menu == 'Add Role') {
        // inqurer.prompt([{type: 'input', message: 'Enter role', name: 'role'}]).then((answer) =>
        //  db.query(`INSERT INTO roles(role) VALUES(${answer.role});`)
        // )
      

      } else if (choice.menu == 'View All Departments') {
        // fetch all employees from workforce_db.Employee
        const response = await fetch("/api/departments", {
          method: "GET"
        });

      } else if (choice.menu == 'Add Department') {
      }
    });
}
showMenu();
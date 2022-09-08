const express = require('express');
const inquirer = require('inquirer');

// const db = require('./db/db.')

const PORT = process.env.port || 3001;
const app = express();

inquirer
  .prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department'],
      name: 'menu'
    }
  ]).then((choice) => {
    if (choice.menu == 'View All Employees') {
      // db.query('SELECT employee FROM employees;');
    } else if (choice.menu == 'Add Employee') {
      // db.query(`INSERT INTO employee(id, name, etc.) VALUES(${id}, ${name}, etc.);`);
    } else if (choice.menu == 'Update Employee Role') {
      // db.query(`;`);
    } else if (choice.menu == 'View All Roles') {
      // db.query('SELECT role FROM roles GROUP BY role;');
    } else if (choice.menu == 'Add Role') {
      // inqurer.prompt([{type: 'input', message: 'Enter role', name: 'role'}]).then((answer) =>
      //  db.query(`INSERT INTO roles(role) VALUES(${answer.role});`)
      // )
    } else if (choice.menu == 'View All Departments') {
      // db.query('SELECT department FROM departments GROUP BY department;');      
    } else if (choice.menu == 'Add Department') {
      
    }
  });



const express = require('express');
const inquirer = require('inquirer');

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
      
    } else if (choice.menu == 'Add Employee') {

    } else if (choice.menu == 'Update Employee Role') {

    } else if (choice.menu == 'View All Roles') {

    } else if (choice.menu == 'Add Role') {
      
    } else if (choice.menu == 'View All Departments') {
      
    } else if (choice.menu == 'Add Department') {
      
    }
  });



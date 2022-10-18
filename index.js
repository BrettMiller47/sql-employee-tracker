const inquirer = require('inquirer');
const connection = require('./config/connection');
const Department = require('./models/Department');
const Role = require('./models/Role');
const Employee = require('./models/Employee');

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

async function addDepartment() {
  inquirer
    .prompt([{
      type: 'input',
      message: 'Enter department name: ',
      name: 'name'
    }]).then((ans) => {
      Department.create({ name: ans.name });
    }).then(() => {
      showMenu();
    });  
}

async function addRole(title, salary, deptName) {  
  
  // Get the deptId [[object, Object],[object, Object]]
  let deptId = await connection.query(`SELECT id FROM workforce_db.department WHERE name='${deptName}';`);
  
  // Get the stringified version of the desired id column result
  let str = JSON.stringify(deptId[0]);
  
  // Match the numerical 'id' value (for department_id)
  let regex = /\d/;
  let matchedDeptID = str.match(regex);  

  // Create the Role using the matchedId
  Role.create({
    title: title,
    salary: salary,
    department_id: matchedDeptID
  })
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
        inquirer
          .prompt([{
              type: 'input',
              message: "Enter role's title: ",
              name: 'title'
            },
            {
              type: 'input',
              message: "Enter role's salary: ",
              name: 'salary'
            },
            {
              type: "input",
              message: "Enter the role's department:",
              name: "dept",
            }  
          ]).then((ans)=>addRole(ans.title, ans.salary, ans.dept))
      } else if (choice.menu == 'View All Departments') {
        viewAllDepartments();

      } else if (choice.menu == 'Add Department') {
        addDepartment();
      }
    });
}
showMenu();

const inquirer = require('inquirer');
const connection = require('./config/connection');
const Department = require('./models/Department');
const Role = require('./models/Role');
const Employee = require('./models/Employee');

async function viewAllEmployees() {
  const employees = await connection.query("SELECT * FROM Employee;");
  console.table(employees[0]);
  showMenu();
}

async function viewAllDepartments() {
  const departments = await connection.query("SELECT * FROM Department;");
  console.table(departments[0]);
  showMenu();
}

async function viewAllRoles() {
  const roles = await connection.query("SELECT * FROM Role;");
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
      console.log('Department added!')
      showMenu();
    });  
}

async function addRole(title, salary, deptName) {  
  
  // Get the deptId [[object, Object],[object, Object]]
  let deptId = await connection.query(`SELECT id FROM Department WHERE name='${deptName}';`);
  
  // Get the stringified version of the desired id column result
  let str = JSON.stringify(deptId[0]);
  
  // Match the numerical 'id' value (for department_id)
  let matchedDeptID = str.match(/\d/);  

  // Create the Role using the matchedId
  Role.create({
    title: title,
    salary: salary,
    department_id: matchedDeptID
  });
  console.log('Role added!');
  showMenu();
}

async function addEmployee(fName, lName, manager, role) {  
  
  // Get the manager ID
  let splitMgr = manager.split(" ");
  let mgrFName = splitMgr[0];
  let mgrLName = splitMgr[1];
  let mgrData = await connection.query(`SELECT id FROM Employee WHERE first_Name='${mgrFName}' AND last_Name='${mgrLName}';`);
  let mgrId = mgrData[0][0].id;

  // Get the role ID
  let roleData = await connection.query(`SELECT id FROM Role WHERE title='${role}'`);
  let roleId = roleData[0][0].id;

  // Create the Employee using the managerId & roleId
  Employee.create({
    first_name: fName,
    last_name: lName,
    manager_id: mgrId,
    role_id: roleId
  })
  console.log('Employee added!')
  showMenu();
}

async function updateEmployeeRole(fName, lName, newRole) {
  
  // Get the employee's ID
  // let employeeId = await connection.query(`SELECT id FROM Employee WHERE first_Name='${fName}' AND last_Name='${lName}';`);
  
  // showMenu()
}

async function getRolesList() {
  // Get the list of roles
  let roleObjects = await connection.query(`SELECT * FROM Role;`);
  let roles = [];
  for (let i = 0; i < roleObjects.length; i++) {
    roles.push(roleObjects[0][i].title);
  }
  return roles;
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
        inquirer
          .prompt([{
            type: 'input',
            message: "Enter employee's first name: ",
            name: 'fName'
          },
          {
            type: 'input',
            message: "Enter employee's last name: ",
            name: 'lName'
          },
          {
            type: "input",
            message: "Enter employee's manager:",
            name: "manager",
          },
          {
            type: "input",
            message: "Enter employee's role:",
            name: "role",
          }
          ]).then((ans) => addEmployee(ans.fName, ans.lName, ans.manager, ans.role));
      } else if (choice.menu == 'Update Employee Role') {
        getRolesList()
          .then((roles) => {
            inquirer
              .prompt([{
                type: 'input',
                message: "Enter employee's first name: ",
                name: 'fName'
              },
              {
                type: 'input',
                message: "Enter employee's last name: ",
                name: 'lName'
              },
              {
                type: "list",
                message: "Select employee's new role:",
                choices: roles,
                name: "role",
              }
              ]).then((ans) => updateEmployeeRole(ans.fName, ans.lName, ans.role));
              });
        
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

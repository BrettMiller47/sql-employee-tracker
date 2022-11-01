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

async function addDepartment(name) {

  await Department.create({ name: name });

  // Print the newly added department
  let deptData = await connection.query(`SELECT * FROM Department WHERE name='${name}'`);
  console.log('\n\nDepartment added! See details below:')
  console.table(deptData[0]);

  showMenu();
}

async function addRole(title, salary, deptName) {  
  
  // -------- CREATE ROLE --------
  // Get the deptId [[object, Object],[object, Object]]
  let deptId = await connection.query(`SELECT id FROM Department WHERE name='${deptName}';`);
  
  // Get the stringified version of the desired id column result
  let str = JSON.stringify(deptId[0]);
  
  // Match the numerical 'id' value (for department_id)
  let matchedDeptID = str.match(/\d/);  

  // Create the Role using the matchedId
  await Role.create({
    title: title,
    salary: salary,
    department_id: matchedDeptID
  });

  // -------- PRINT ROLE --------
  // Join the newly added role's info with its department info
  let roleData = await connection.query(`
    SELECT * FROM Role
    INNER JOIN Department
    ON Role.department_id = Department.id
    WHERE title='${title}'
    AND salary='${salary}'
    AND department_id=${matchedDeptID}
  `);

  // Remove the ID field for department
  delete roleData[0][0].department_id;
  // Replace the department's 'name' field
  roleData[0][0].department = roleData[0][0].name;
  delete roleData[0][0].name;

  // Print the newly added role
  console.log('\n\nRole added! See details below:');
  console.table(roleData[0]);

  showMenu();
}

async function printEmployeeRow(employeeId) {
  
  // Get the employee's data joined with role and department (by their respective IDs)
  let employeeData = await connection.query(`
    SELECT * FROM Employee
    INNER JOIN Role as EmployeesWithRoles
    ON Employee.role_id = EmployeesWithRoles.id
    INNER JOIN Department
    ON EmployeesWithRoles.department_id = Department.id
    WHERE Employee.id = ${employeeId};
  `);

  // Remove the id columns
  delete employeeData[0][0].role_id;
  delete employeeData[0][0].manager_id;
  delete employeeData[0][0].department_id;

  // Rename the key for department (currently set as 'name')
  employeeData[0][0].department = employeeData[0][0].name;
  delete employeeData[0][0].name;

  // log the employee's info
  console.log("\n\nThe updated employee's data is shown below.");
  console.table(employeeData[0]);
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
  await Employee.create({
    first_name: fName,
    last_name: lName,
    manager_id: mgrId,
    role_id: roleId
  })

  // Get the new employee's ID
  let employeeData = await connection.query(`
    SELECT id FROM Employee
    WHERE first_name='${fName}'
    AND last_name='${lName}'
    AND manager_id=${mgrId}
    AND role_id=${roleId}; 
  `)
  let employeeId = employeeData[0][0].id;

  // Print the new employee
  console.log('\n\nEmployee added! See details below:')
  await printEmployeeRow(employeeId);

  showMenu();
}

async function updateEmployeeRole(fName, lName, newRole) {
  
  // Get the employee's ID
  try {
    var employeeData = await connection.query(`SELECT id FROM Employee WHERE first_Name='${fName}' AND last_Name='${lName}';`);
  } catch {
    console.log('ERROR: employee does not exist.');
    console.log('Please restart the application and select "View all Employees" to ensure proper spelling.');
    return 1;
  }
  let employeeId = employeeData[0][0].id;

  // Get the new role's ID
  let newRoleData = await connection.query(`SELECT * FROM Role WHERE title='${newRole}'`);
  let newRoleId = newRoleData[0][0].id;

  // Update the employee's role
  await connection.query(`
    UPDATE Employee
    SET role_id = ${newRoleId}
    WHERE id='${employeeId}';
  `)

  // Cleanly print the updated employee's new info
  await printEmployeeRow(employeeId);

  showMenu();
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
        inquirer
          .prompt([{
            type: 'input',
            message: 'Enter department name: ',
            name: 'name'
          }]).then((ans) => {
            addDepartment(ans.name);
          });
      }
    });
}
showMenu();

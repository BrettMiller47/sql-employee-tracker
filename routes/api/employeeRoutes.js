const router = require('express').Router();
const Employee = require('../../models/Employee');

// GET all employees from workforce_db.Employee
// localhost:3001/api/employees
router.get('/', async (req, res) => {
  // Store the employeeData in a variable once the promise is resolved.
  const employeeData = await Employee.findAll();

  // Return the employeeData promise inside of the JSON response
  return res.json(employeeData);
});


// GET specific employee by primary key (employee_id) within workforce_db.Employee
// localhost:3001/api/employees/:id
router.get('/:employee_id', async (req, res) => {
  const employeeData = await Employee.findByPk(req.params.id);

  return res.json(employeeData);
});

// POST new employee 
// localhost:3001/api/employees
router.post('/', async (req, res) => {
  const employeeData = await Employee.create(req.body);

  return res.json(employeeData);
});

module.exports = router;

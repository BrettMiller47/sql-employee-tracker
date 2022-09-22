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

// POST a new employee to workforce_db.Employee
// localhost:3001/api/employees
router.post('/', async (req, res) => {
  const employeeData = await Employee.create(
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      role_id: req.body.role_id,
      manager_id: req.body.manager_id
    }
  );
  
  return res.json(employeeData);
});

// PUT an existing employee's role to new value
// localhost:3001/api/roles/:employee_id
router.put('/:employee_id', async (req, res) => {
  const employeeData = await Employee.update(
    {
      role: req.body.role,
    },
    {
      where: {
        employee_id: req.params.employee_id,
      },
    }
  );

  return res.json(employeeData);
});

// GET specific employee by primary key (employee_id) within workforce_db.Employee
// localhost:3001/api/employees/:id
router.get('/:employee_id', async (req, res) => {
  const employeeData = await Employee.findByPk(req.params.id);

  return res.json(employeeData);
});


module.exports = router;

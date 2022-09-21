const router = require('express').Router();
const Employee = require('../../models/Employee');

// GET all roles from workforce-db.Employee 
// localhost:3001/api/roles
router.get('/', async (req, res) => {
  const employeeData = await Employee.findAll({
    where: {
      role: req.body.role,
    }
  });

  return res.json(employeeData);
});

// PUT existing employee's role to new value by primary key (employee_id) within workforce_db.Employee
// localhost:3001/api/roles/:employee_id
router.put('/:employee_id', async (req, res) => {
  const employeeData = await Employee.update(
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      role: req.body.role,
      department: req.body.department,
      salary: req.body.salary,
      manager: req.body.manager,
    },
    {
      where: {
        employee_id: req.params.employee_id,
      },
    }
  );

  return res.json(employeeData);
});

module.exports = router;

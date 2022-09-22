const router = require('express').Router();
const Department = require('../../models/Department');

// GET all departments from workforce-db.Department 
// localhost:3001/api/departments
router.get('/', async (req, res) => {
  const departmentData = await Department.findAll();

  return res.json(departmentData);
});

// POST a new department to workforce_db.Employee
// localhost:3001/api/departments
router.post('/', async (req, res) => {
  const departmentData = await Department.create(
    {
      name: req.body.name
    },
  );

  return res.json(departmentData);
});

module.exports = router;

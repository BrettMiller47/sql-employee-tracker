const router = require('express').Router();
const Role = require('../../models/Role');

// GET all roles from workforce-db.Role 
// localhost:3001/api/roles
router.get('/', async (req, res) => {
  const roleData = await Role.findAll();

  return res.json(roleData);
});

// POST a new role to workforce_db.role
// localhost:3001/api/roles
router.post('/', async (req, res) => {
  const roleData = await Role.create(
    {
      title: req.body.title,
      salary: req.body.salary,
      department_id: req.body.department_id
    },
  );

  return res.json(roleData);
});


module.exports = router;

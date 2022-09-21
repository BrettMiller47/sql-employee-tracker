const router = require('express').Router();
const Employee = require('../../models/Employee');

// localhost/
router.get('/', async (req, res) => {
  // Store the employeeData in a variable once the promise is resolved.
  const employeeData = await Employee.findAll();

  // Return the employeeData promise inside of the JSON response
  return res.json(employeeData);
});

router.post('/', async (req, res) => {
  const employeeData = await Employee.create(req.body);

  return res.json(employeeData);
});

router.get('/paperbacks', async (req, res) => {
  const employeeData = await Employee.findAll({
    order: ['title'],
    where: {
      is_paperback: true,
    },
    attributes: {
      exclude: ['is_paperback', 'edition'],
    },
  });

  return res.json(employeeData);
});

router.get('/:id', async (req, res) => {
  const employeeData = await Employee.findByPk(req.params.id);

  return res.json(employeeData);
});

router.post('/', async (req, res) => {
  const employeeData = await Employee.create(req.body);

  return res.json(employeeData);
});

router.put('/:employee_id', async (req, res) => {
  const employeeData = await Employee.update(
    {
      title: req.body.title,
      author: req.body.author,
      isbn: req.body.isbn,
      pages: req.body.pages,
      edition: req.body.edition,
      is_paperback: req.body.is_paperback,
    },
    {
      where: {
        employee_id: req.params.employee_id,
      },
    }
  );

  return res.json(employeeData);
});

router.delete('/:employee_id', async (req, res) => {
  const employeeData = await Employee.destroy({
    where: {
      employee_id: req.params.employee_id,
    },
  });

  return res.json(employeeData);
});

module.exports = router;

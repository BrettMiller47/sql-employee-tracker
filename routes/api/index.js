const router = require('express').Router();
const employees = require('./employeeRoutes');
const roles = require('./roleRoutes');
const departments = require('./departmentRoutes');

router.use('/employees', employees);
router.use('/roles', roles);
router.use('/departments', departments);

module.exports = router;
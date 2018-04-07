const router = require('express').Router();
const { check } = require('express-validator/check');

const isAuthenticated = require('../middlewares/auth');
const { CompanyController, JobController, ApplicationController, UserController } = require('../controllers');

router.route('/companies')
  .get(isAuthenticated, CompanyController.find)
  .post(isAuthenticated, CompanyController.create);
router.route('/companies/:id')
  .get(isAuthenticated, CompanyController.findOne)
  .put(isAuthenticated, CompanyController.update)
  .delete(isAuthenticated, CompanyController.delete);

router.route('/jobs')
  .get(isAuthenticated, JobController.find)
  .post(isAuthenticated, JobController.create);

router.route('/applications')
  // .get(ApplicationController.find)
  .post(isAuthenticated, ApplicationController.create);

router.route('/signup')
  .post([
    check('email', 'must be a valid email').isEmail(),
    check('password', 'password must be at least 6 chars long').isLength({ min: 6 }),
  ], UserController.signup);
router.route('/login')
  .post([
    check('email', 'must be a valid email').isEmail(),
    check('password', 'password must be at least 6 chars long').isLength({ min: 6 }),
  ], UserController.login);

module.exports = router;

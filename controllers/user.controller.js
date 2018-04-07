const { validationResult } = require('express-validator/check');

const UtilService = require('../services/util.service');
const JwtService = require('../services/jwt.service');

module.exports = {
  /**
   * @api {post} /signup
   * @apiGroup Users
   * @apiName signupUser
   * @apiParam {String} email user must provide an email
   * @apiParam {String} password user must provide a password
   * @apiParamExample {json} Example :
   * {
   *  "email":"john@doe.com",
   *  "password":"qwerty"
   * }
   * @apiSuccess (201) Msg User created
   * @apiSuccessExample {json} Example : 
   * "Signup successful!"
   * @apiError (400) Msg Conflicts on creating user 
   * @apiError (500) Msg Server error
   */
  async signup(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const result = errors.array().map(value => ({
          name: value.param,
          message: value.msg,
        }));
        return res.status(400).json({
          type: 'Validation',
          code: 1,
          errors: result,
        });
      }
      let { email, password } = req.body;
      const emailExists = await req.db.User.count({
        where: {
          email,
        },
      });
      if (emailExists > 0) {
        return res.status(400).json({
          type: 'Validation',
          code: 1,
          errors: [{ name: 'email', message: 'email already being used' }],
        });
      }
      password = await UtilService.hashPassword(password);
      await req.db.User.create({
        email,
        password,
      });
      res.status(201).json('Signup successful!');
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  /**
   * @api {post} /login
   * @apiGroup Users
   * @apiName loginUser
   * @apiParam {String} email user needs to provide an email
   * @apiParam {String} password user needs to provide password
   * * @apiParamExample {json} Example :
   * {
   *  "email":"client@doe.com",
   *  "password":"123456"
   * }
   * @apiSuccess (20) Msg JWT of the user (TTL 1hr)
   * @apiSuccessExample {json} Example : 
   * {
   *  "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImF6QGRvZS5jb20ifSwiaWF0IjoxNTIzMTMwNTY4LCJleHAiOjE1MjMxMzQxNjh9.-ehUDK1QIKfcBaMO2o6vBRwz_nmPVcaEFyP8cJbg2iM"
   * }
   * @apiError (400) Msg Conflicts on creating user 
   * @apiError (500) Msg Server error
   */
  async login(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const result = errors.array().map(value => ({
          name: value.param,
          message: value.msg,
        }));
        return res.status(400).json({
          type: 'Validation',
          code: 1,
          errors: result,
        });
      }
      let { email, password } = req.body;
      const user = await req.db.User.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        return res.status(400).json({
          type: 'Validation',
          code: 1,
          errors: [{ name: 'email', message: 'user not found' }],
        });
      }
      const match = await UtilService.comparePassword(password, user.password);
      if (!match) {
        return res.status(400).json({
          type: 'Validation',
          code: 1,
          errors: [{ name: 'password', message: 'invalid password' }],
        });
      }
      const token = JwtService.issue({
        user: {
          id: user.id,
          email: user.email,
        },
      }, '1h');
      res.json({ token });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};

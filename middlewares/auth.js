const JwtService = require('../services/jwt.service');

module.exports = async (req, res, next) => {
  try {
    let token = '';
    if (req.headers.authorization) {
      token = req.headers.authorization;
    } else {
      return res.status(401).json({
        type: 'Validation',
        code: 1,
        errors: [{ name: 'Authorization', message: 'Authorization header missing' }],
      });
    }
    const decodedToken = JwtService.verify(token);
    const user = await req.db.User.findOne({
      where: {
        id: decodedToken.user.id,
      },
    });
    if (!user) {
      return res.status(401).json({
        type: 'Validation',
        code: 1,
        errors: [{ name: 'Authorization', message: 'Unauthorized' }],
      });
    }
    req.decodedToken = decodedToken.user;
    await next();
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

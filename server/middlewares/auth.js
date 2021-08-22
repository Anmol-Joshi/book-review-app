const authenticate = (req, res, next) => {
  console.log(req.session);
  if (!req.session.userId) {
    res.status(401).send('Not Logged In');
    return;
  }

  next();
};

module.exports = {
  authenticate,
};

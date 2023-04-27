module.exports = (req, res, next) => {
  console.log(
    `${new Date().toLocaleString()} | session_id: ${req.session_id} | ${req.method} ${
      req.url
    }`
  );

  next();
};

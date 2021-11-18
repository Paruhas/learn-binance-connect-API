module.exports = (err, req, res, next) => {
  if (err.httpStatusCode) {
    return res.status(err.httpStatusCode).json({
      res_code: err.resErrorCode,
      res_data: {},
      res_message: err.message,
    });
  }
  if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError")
    return res.status(401).json({
      res_code: err.resErrorCode,
      res_message: err.message,
      res_data: {},
    }); // ดัก Error จากการ Auth Token
  if (err.name === "SequelizeValidationError")
    return res.status(400).json({
      res_code: err.resErrorCode,
      res_message: err.message,
      res_data: {},
    });

  console.log(err);
  return res.status(500).json({
    res_code: "7880",
    res_message: err.message,
    res_data: {},
  });
};

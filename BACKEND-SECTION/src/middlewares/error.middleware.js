module.exports = (err, req, res, next) => {
  // tipo de status del error
  const httpStatus = err.status || 500;
  return res.status(httpStatus).send({
    status: httpStatus,
    message: err.message || "Internal server error",
  });
};
const CustomError = require("../../helpers/errors/CustomError");
const jwt = require("jsonwebtoken");
const { isTokenIncluded } = require("../../helpers/authorization/tokenHelpers");
const getAccessToRoute = (req, res, next) => {
  // 401 , 403
  // 401 - Unauthorized
  // 403 - Forbidden
  // Token
  if (!isTokenIncluded(req)) {
    return next(new CustomError("You are not authorized to access this route"));
  }

  next();
};
module.exports = {
  getAccessToRoute,
};

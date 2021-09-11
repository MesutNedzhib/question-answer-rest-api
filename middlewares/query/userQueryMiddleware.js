const expressAsyncHandler = require("express-async-handler");
const { searchHelper, paginationHelper } = require("./queryMiddlewareHelepers");

const userQueryMiddleWare = function (model, options) {
  return expressAsyncHandler(async function (req, res, next) {
    let query = model.find();

    // Search by name
    query = searchHelper("name", query, req);

    // Pagination
    const total = await model.countDocuments();
    const paginationResult = await paginationHelper(total, query, req);
    query = paginationResult.query;
    const pagination = paginationResult.pagination;

    const queryResults = await query;

    res.queryResults = {
      success: true,
      count: queryResults.length,
      pagination: pagination,
      data: queryResults,
    };

    next();
  });
};

module.exports = {
  userQueryMiddleWare,
};

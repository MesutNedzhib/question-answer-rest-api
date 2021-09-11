const expressAsyncHandler = require("express-async-handler");
const { searchHelper, paginationHelper, populateHelper } = require("./queryMiddlewareHelepers");

const answerQueryMiddleWare = function (model, options) {
  return expressAsyncHandler(async function (req, res, next) {
    const { id } = req.params;

    const arrayName = "answers";
    const total = (await model.findById(id))["answerCount"];

    // Pagination
    const paginationResult = await paginationHelper(total, undefined, req);

    const startIndex = paginationResult.startIndex;
    const limit = paginationResult.limit;

    // 2 3 4 5
    let queryObject = {};

    queryObject[arrayName] = { $slice: [startIndex, limit] };

    let query = model.find({ _id: id }, queryObject);

    // Populate
    query = populateHelper(query,options.population);

    const queryResults = await query;

    res.queryResults = {
      success: true,
      pagination: paginationResult.pagination,
      data: queryResults,
    };

    next();
  });
};

module.exports = {
  answerQueryMiddleWare,
};

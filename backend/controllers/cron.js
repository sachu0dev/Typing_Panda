const { User, UserScore } = require("../modal.js")

const cron = async function cronFun(req, res, next) {
  try {
    console.log("Trying to clear today's score");
    await UserScore.updateMany({}, { $set: { todayscore: [] } });
    console.log('Todayscore cleared successfully.');
    next(); // Call next to proceed to the next middleware
  } catch (error) {
    console.error('Error clearing todayscore:', error.message || error);
    next(error); // Pass the error to the error handler middleware
  }
}

module.exports = cron;

const { User, UserScore } = require("./modal.js");
export const cron = async () => {
  try {
    console.log("Trying to clear today's score");
    await UserScore.updateMany({}, { $set: { todayscore: [] } });
    console.log('Todayscore cleared successfully.');
  } catch (error) {
    console.error('Error clearing todayscore:', error.message || error);
  }

};
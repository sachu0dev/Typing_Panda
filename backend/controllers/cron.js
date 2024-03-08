
const { UserScore } = require("./modal.js");
async function clearTodaysScore() {
    try {
        console.log("Trying to clear today's score");
        await UserScore.updateMany({}, { $set: { todayscore: [] } });
        console.log('Todayscore cleared successfully.');
    } catch (error) {
        console.error('Error clearing todayscore:', error.message || error);
    }
}

// Export the function to be deployed as a serverless function
module.exports = clearTodaysScore;
